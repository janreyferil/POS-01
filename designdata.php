<?php 
    /**

        users
        id
        user_fn
        user_ln
        username
        password
        created_at
        updated_at

        roles
        id
        user_id
        role

        admin_credential
        id
        role_id
        credential

        admin_announce
        ann_id
        title
        body
        created_at
        updated_at

        logbook
        id
        role_id
        login
        logout

        todo
        id
        user_id
        body
        created_at
        updated_at

        supplier_person 
        person_id
        user_id
        fn
        ln
        company
        contact
        created_at
        updated_at

        supplier_supply
        id
        supply_id
        stock
        created_at
        updated_at
        
        suppplier_transac
        id
        transac_id
        supp_user_id    -- user table
        supp_product_id -- supply table
        quantity
        unit_price
        created_at
        updated_at
    
        inventory_category
        category_id
        category_name
        created_at

        inventory_product
        inventory_id
        supp_product_id -- supply table
        inventory_category_id -- category table
        code
        name
        price
        created_at
        updated_at




        
     */

?>