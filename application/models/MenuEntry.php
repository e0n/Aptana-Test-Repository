<?php
/**
 * User: pascal
 * Date: 05.05.12
 * Time: 21:20
 */
class Model_MenuEntry extends Lib_Db_Model
{
    protected $_ID;
    protected $_fk_ID;
    protected $_name;
    protected $_onClick;

    public function setID($ID)
    {
        $this->_ID = $ID;
    }

    public function getID()
    {
        return $this->_ID;
    }

    public function setFk_ID($fk_ID)
    {
        $this->_fk_ID = $fk_ID;
    }

    public function getFk_ID()
    {
        return $this->_fk_ID;
    }

    public function setName($name)
    {
        $this->_name = $name;
    }

    public function getName()
    {
        return $this->_name;
    }

    public function setOnClick($onClick)
    {
        $this->_onClick = $onClick;
    }

    public function getOnClick()
    {
        return $this->_onClick;
    }
}
