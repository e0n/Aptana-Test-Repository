<?php
/**
 * User: sebastian
 * Date: 11.08.12
 */

// A Data Mapper maps a domain object to the database.
// In our case, it will map our model, Model_Users, to our data source, Model_Users_DbTable.
class Model_Users_DbMapper extends Lib_Db_Mapper
{
    protected $_dbTableName = "Model_Users_DbTable";

    public function save(Model_Users $users)
    {
        $data = array(
            'username' => $users->getUsername(),
            'password' => $users->getPassword(),
            'email' => $users->getEmail(),
        );

        if (null === ($id = $users->getId())) {
            unset($data['id']);
            $this->getTable()->insert($data);
        } else {
            $this->getTable()->update($data, array('id = ?' => $id));
        }
    }

    public function checkUnique($username)
    {
        $tableAdapter = $this->getTable()->getAdapter();
        $select = $tableAdapter->select();

        $select->from('users',array('username'));//todo 1st param should be a variable like $this->_name
        $select->where('username=?',$username);
        //fetch Query
        $result = $tableAdapter->fetchOne($select);

        if($result){
            return true;
        }
        return false;
    }

    public function getID($username)
    {
        $tableAdapter = $this->getTable()->getAdapter();
        $select = $tableAdapter->select();

        $select->from('users',array('id'));//todo 1st param should be a variable like $this->_name
        $select->where('username=?',$username);
        //fetch Query
        $result = $tableAdapter->fetchOne($select);

        if($result){
            return $result;
        }
        return false;
    }

    //search in db for this email and return the corresponding username.
    public function getUsernameFromEmail($email){
        $tableAdapter = $this->getTable()->getAdapter();
        $select = $tableAdapter->select();
        $select->from('users',array('username'));//todo 1st param should be a variable like $this->_name
        $select->where('email=?',$email);
        //fetch Query
        $result = $tableAdapter->fetchOne($select);
        if($result){
            return $result;
        }
        return false;
    }

}