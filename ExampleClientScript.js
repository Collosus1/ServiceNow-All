function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue == '') {
    return;
  }
  //==================================================================
  //Call Script Include to get Variables from linked RITM in JSON response
  //Reference variable from catalog item is: select_request
  //Variable needed from new Catalog Item: title_of_request
  //==================================================================
  var ga = new GlideAjax('getRITMVarsSmartFormCatItem'); //this is the script include
  ga.addParam("sysparm_name", "getvars");
  ga.addParam("sysparm_sysid", g_form.getValue('select_request')); //Variable you want to use as reference
  ga.getXMLAnswer(AjaxParse);

  function AjaxParse(response) {
    //==================================================================
    //Parse JSON Response and Set Variables on Current RITM
    //==================================================================
    var answer = JSON.parse(response);
    //alert(answer[0].question_1,true)
    g_form.setValue('title_of_request', answer[0].title_of_request, true);
  }

}
