<?php
/**
 * User: sebastian
 * Date: 11.08.12
 */

/**
 * A Data Mapper maps a domain object to the database.
 * In our case, it will map our model, Model_Users, to our data source, Model_Users_DbTable.
 */
class Model_Users_DbMapper extends Lib_Db_Mapper
{
    protected $_dbTableName = "Model_Users_DbTable";

    /** 
     * Save the username, password and email address into database
     */
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

    /** 
     * Check if a username is unique in the database
     * @param string $username the user
     * @return boolean if the user is unique
     */
    public function checkUnique($username)
    {
        $tableAdapter = $this->getTable()->getAdapter();
        $select = $tableAdapter->select();

        $select->from('users',array('username'));
        $select->where('username=?',$username);
        //fetch Query
        $result = $tableAdapter->fetchOne($select);

        if($result){
            return true;
        }
        return false;
    }

    /** 
     * Get the ID of a user
     * @param string $username the user
     * @return string the id or false if none was found
     */
    public function getID($username)
    {
        $tableAdapter = $this->getTable()->getAdapter();
        $select = $tableAdapter->select();

        $select->from('users',array('id'));
        $select->where('username=?',$username);
        //fetch Query
        $result = $tableAdapter->fetchOne($select);

        if($result){
            return $result;
        }
        return false;
    }

    /** 
     * Search in db for this email and return the corresponding username.
     * @param string $email the users email
     * @return string the user or false if none was found
     */
    public function getUsernameFromEmail($email)
    {
        $tableAdapter = $this->getTable()->getAdapter();
        $select = $tableAdapter->select();
        $select->from('users',array('username'));
        $select->where('email=?',$email);
        //fetch Query
        $result = $tableAdapter->fetchOne($select);
        if($result){
            return $result;
        }
        return false;
    }

}
