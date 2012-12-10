<?php
/**
 * User: sebastian
 * Date: 11.08.12
 */
class Model_Users_DbTable extends Zend_Db_Table_Abstract
{
   /** Table name */
   protected $_name = 'users';
   protected $_primary = "id";
}
