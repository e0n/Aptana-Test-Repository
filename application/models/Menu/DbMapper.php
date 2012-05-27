<?php
/**
 * User: pascal
 * Date: 05.05.12
 */
class Model_Menu_DbMapper extends Lib_Db_Mapper
{
    protected $_dbTableName = "Model_Menu_DbTable";

    public function getMenuDbExprBsp(){
        //get Zend_Db_Table Object
        $table = $this->getTable();
        //get Zend_Db_Select Object from Db Object not from Table Object
        $select = $table->getAdapter()->select();
        //setup Sql Query
        $select->from(array("m" => "menu"));
        $select->join(array("e" => "menu_entry"), "m.ID = fk_ID");
        $select->order("e.ID ASC");
        //make Query from Select Object
        $query = $select->query();
        //fetch Query
        return $query->fetchAll();
    }

    public function getMenu() {
        $menuEntriesMapper = new Model_MenuEntry_DbMapper();

        $menus = $this->fetchAll();
        $menuEntries  = $menuEntriesMapper->fetchAll();

        $out = array();
        foreach($menus as $menu) {
            $tmp = array();
            foreach($menuEntries as $menuEntry) {
                if($menu->_ID == $menuEntry->_fk_ID){
                    $tmp[] = $menuEntry;
                }
            }
            $out[] = array($menu,$tmp);
        }
        return $out;
    }
}
