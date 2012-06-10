<?php
/**
 * Created by Tobias Ladewig.
 * User: Tobi
 * Date: 30.05.12
 * Time: 12:18
 * To change this template use File | Settings | File Templates.
 */
/**
class Application_Model_Guestbook
{
    protected $_comment;
    protected $_created;
    protected $_email;
    protected $_id;

    public function __set($name, $value);
    public function __get($name);

    public function setComment($text);
    public function getComment();

    public function setEmail($email);
    public function getEmail();

    public function setCreated($ts);
    public function getCreated();

    public function setId($id);
    public function getId();
}

class Application_Model_GuestbookMapper
{
    public function save(Application_Model_Guestbook $guestbook);
    public function find($id);
    public function fetchAll();
}
*/