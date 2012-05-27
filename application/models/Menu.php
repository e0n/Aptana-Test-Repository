<?php
/**
 * User: pascal
 * Date: 05.05.12
 */
class Model_Menu extends Lib_Db_Model
{
    protected $_ID;
    protected $_Name;

    public function setName($Name)
    {
        $this->_Name = $Name;
    }

    public function getName()
    {
        return $this->_Name;
    }

    public function setID($ID)
    {
        $this->_ID = $ID;
    }

    public function getID()
    {
        return $this->_ID;
    }
}
