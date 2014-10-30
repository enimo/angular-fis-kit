<?php
// 2013-09-05
// enimo
// for nodejs local
// USAGE:
//		npm install -g nodesync
//
@error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

$auth_key = 'sample_code';

if(empty(trim($_GET['auth'])) || trim($_GET['auth']) != $auth_key) {
    echojson('Params incorrect :( ', 22001);
}

$op = $_POST['op'];
$fore_md5 = $_POST['md5'];
$pathto = urldecode($_POST['to']);
$filepath = urldecode($_POST['filepath']);
$force= $_POST['force'];

$real_path = $pathto.$filepath;

if(empty($op)){
    $op = 'change';
}
if(empty($pathto)){
    $pathto = '/home/enimo/nodesync';
}


if($op == 'init'){
    echojson('Init connect success, sync server on ready... ', 22000);
}

if($op && $pathto && $filepath){
    exe_op($op);
}else{
    //echo json_encode(var_dump($_POST));
    echojson('Sync params incorrect :( ', 22001);
}



//////////////////////////////////////
///// functions below
/////////////////////////////////////
function mkdirs($path, $mod = 0777){
    if (is_dir($path)) {
        return chmod($path, $mod);
    } else {
        $old = umask(0);
        if (mkdir($path, $mod, true) && is_dir($path)) {
            umask($old);
            return true;
        } else {
            umask($old);
        }
    }
    return false;
}


function delete_file($file) {
    global $pathto;
    $pathto_len = strlen($pathto);
    if(strlen($file) > $pathto_len && substr($file, 0, $pathto_len) == $pathto){
        exec('rm -rf ' . escapeshellarg($file),  $retval);
    }
    return !($retval == 0); // UNIX commands return zero on success
}

function echojson($msg = 'no message.', $status = 22000){
    global $real_path, $op, $force;
    if($force == 'true'){
        $msg = '[FORCE] '.$msg;
    }
    header('Content-type: application/json');
    $arr = array('code'=>$status, 'msg'=>$msg);
    if($op && $real_path){
        $arr['md5'] = md5(file_get_contents($real_path));
    }
    echo json_encode($arr);
    exit;
}

function exe_op($op){
    global $real_path, $pathto, $filepath, $fore_md5, $force;
    switch($op){
        case 'mv':
            $target_file = $pathto . urldecode($_POST['target']);
            if(rename($real_path, $target_file)){
                echojson($filepath.' file mv success.');
            }else{
                echojson($filepath.' file mv failed.', 22001);
            }
            break;
        case 'mkdir':
            if(is_dir($real_path)){
                if(mkdirs($real_path)){
                    echojson($filepath.' mkdir success.');
                }else{
                    echojson($filepath.' mkdir failed.', 22001);
                }
            }else{
                echojson($filepath.' is not a dir.', 22001);
            }
            break;

        case 'delete':
        case 'del':
            if(file_exists($real_path) && ( is_dir($real_path) ||  is_file($real_path) )){
                if(delete_file($real_path)){
                    echojson($filepath.' file remove success.');
                }else{
                    echojson($filepath.' file remove failed.', 22001);
                }
            }else{
                echojson($filepath.' remove file is not exist.', 22001);
            }
            break;

        default: //file change
            if (is_dir($real_path) || $_FILES["file"]["error"] > 0) {
                //header("Status: 500 Internal Server Error");
                echojson($filepath.' there is some thing wrong when upload or is dir.', 22001);
            } else {
                if (file_exists($real_path)) {
                    $cur_md5 = md5(file_get_contents($real_path));
                    //echo 'file_get_contents('.$real_path.'):';
                    //echo file_get_contents($real_path);
                    if($cur_md5 == $fore_md5 || $force == 'true' ){
                        @unlink($real_path);
                    }else{
                        //echojson($filepath.', server md5='.$cur_md5.', local md5='.$fore_md5.', file md5 not match, sync failed.', 22001);
                        echojson($filepath.', file md5 not match, please check your version and try svn up.', 22001);
                        exit;
                    }

                } else {
                    $dir = dirname($real_path);
                    if (!file_exists($dir)) {
                        mkdirs($dir);
                    }
                }
                //var_dump( $_FILES);
                if(move_uploaded_file($_FILES["file"]["tmp_name"], $real_path)){
                    echojson($filepath.' file change success.');
                }else{
                    echojson($filepath.' file change failed.', 22001);
                }
            }//end default => if is dir

    }//end switch
}