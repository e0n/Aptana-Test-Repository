<?php
/**
 * User: pascal
 * Date: 05.05.12
 */
class Lib_Db_Mapper
{
    /**
     * @var Zend_Db_Table
     */
    private $_table;

    /**
     * creates new Object of Zend_Db_Table
     */
    public function __construct() {
        if(empty($this->_table)){
            $this->_table = new $this->_dbTableName();
        }
    }

    public function setTable($table)
    {
        $this->_table = $table;
    }

    public function getTable()
    {
        return $this->_table;
    }

    /**
     * @return array(Lib_Db_Model, ..)
     */
    public function fetchAll() {
        $modelName = explode('_', $this->_dbTableName);
        unset ($modelName[count($modelName) - 1]);
        $modelName = implode('_', $modelName);
        $datas = $this->_table->fetchAll();

        $out = array();
        foreach($datas->toArray() as $data){
            $model = new $modelName();
            foreach($data as $key => $value){
                $set = 'set' . ucfirst($key);
                $model->$set($value);
            }
            $out[] = $model;
        }

        return $out;
    }
}