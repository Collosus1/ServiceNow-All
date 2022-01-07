var getRITMVarsSmartFormCatItem = Class.create();
getRITMVarsSmartFormCatItem.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getvars: function() {
        var vars = []; // Create the object within the while loop
        var scOption = new GlideRecord('sc_req_item');
        scOption.addQuery('sys_id', this.getParameter("sysparm_sysid"));
        scOption.query();
        if (scOption.next()) {
            var var1 = {}; // Create the object within the while loop
            //Variables you wish to Pull for Replication on to Child-Phase2 RITM
            var1.title_of_request = scOption.variables.title_of_request.toString();
            vars.push(var1); // push results in the array
        }
        var json = new JSON(); // move your json setup outside the while loop
        var vars_data = json.encode(vars); //JSON formatted string
        return vars_data;
    },
    type: 'getRITMVarsSmartFormCatItem'
});
