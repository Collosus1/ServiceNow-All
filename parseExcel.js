var Test_script = Class.create();
Test_script.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    githubfun: function(ritmobj) {
        var finalObj = {};
        var finalObj1 = {};

        var nemail = ritmobj.variables.number_of_email_addresses_is_more_than_10.toString();
        if (nemail == 'Yes') {
            finalObj['ref'] = "main";
            finalObj1['sysId'] = ritmobj.number.toString();
            finalObj1['environment'] = ritmobj.variables.environment.toString();

            var attachmentSysID = "";
            var tableName = "sc_req_item";
            var tableSysID = ritmobj.sys_id.toString();

            var grAttachment = new GlideRecord("sys_attachment");
            grAttachment.addEncodedQuery("table_name=" + tableName + "^table_sys_id=" + tableSysID);
            grAttachment.query();
            if (grAttachment.next()) {
                attachmentSysID = grAttachment.getUniqueValue();
            }

            var parser = new sn_impex.GlideExcelParser();
            var attachment = new GlideSysAttachment();
            var attachmentStream = attachment.getContentStream(attachmentSysID);

            parser.parse(attachmentStream);
            var headers = parser.getColumnHeaders();
            var data = [];
            while (parser.next()) {
                var row = parser.getRow();
                var rowData = [];
                for (var i = 0; i < headers.length; i++) {
                    var cellValue = row[headers[i]];
                    rowData.push(cellValue);
                }
                data.push(rowData);
            }

            var dataString = JSON.stringify(data);
            var dataparse = JSON.parse(dataString);
            gs.info(dataString);
            gs.info(dataparse);

            var new_array = [];
            var len = dataparse.length;
            for (var j = 0; j < len; j++) {
                var finalObj2 = {};
                finalObj2['email'] = dataparse[j];
                new_array.push(finalObj2);
            }

            finalObj1['json_payload'] = JSON.stringify(new_array);
            finalObj['inputs'] = finalObj1;
        } else {
            finalObj['ref'] = "main";
            finalObj1['sysId'] = ritmobj.number.toString();
            finalObj1['environment'] = ritmobj.variables.environment.toString();
            
            var new_arr = [];
            var test = ritmobj.variables.e_mail_address.toString();
            var tset = JSON.parse(test);

            for (var x in tset) {
                var finalObj2 = {};
                finalObj2['email'] = tset[x].e_mail_address1.toString();
                new_arr.push(finalObj2);
            }

            finalObj1['json_payload'] = JSON.stringify(new_arr);
            finalObj['inputs'] = finalObj1;
        }

        return finalObj;
    },

    type: 'Test_script'
});
