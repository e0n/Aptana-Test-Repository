<?php
/**
 * User: pascal
 * Date: 05.05.12
 */
class Lib_Db_Model
{
    public function __get($name) {
        return $this->$name;
    }

    public function __set($name, $value){
        $this->set . $name ($value);
    }
}
