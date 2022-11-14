//This function is able to parse HTML table data by tag name "table", this and variations make it versatile 
(function downloadTableData(){


    function parseTable(table) {

        var file_string = "";
    
        //var table_number = window.prompt("Table number:") - 1;
        var column_names = table.children[0].children[0].children;
        
        col_names = "";
        for(var i=0; i<column_names.length; i++){ 
            col_names += '"' + column_names[i].innerText+ '"';
            if (i != column_names.length - 1) col_names = ",";
        }
        file_string += col_names += "\n";
    
    
        var table_rows = table.children[1].children;
        var extracted_rows = [];
    
        for(var row_i=0; row_i<table_rows.length; row_i++){
            var row_vals = ""
            for(var col_i=0; col_i<table_rows[row_i].children.length; col_i++){                                            
                row_vals += '"' + table_rows[row_i].children[col_i].innerText + '"';
                if (col_i != table_rows[row_i].children.length - 1) row_vals += ",";
    
            }
            file_string += row_vals+"\n";
            
            extracted_rows.push(row_vals);
        }
    
    
        var less_than_chars = file_string.replaceAll('≤', '<=');
        var greater_than_chars = less_than_chars.replaceAll('≥', '>=');
    
        file_string = greater_than_chars;
    
        var goodChars = "";
        for(var i=0; i < file_string.length; i++){
            if (file_string.charCodeAt(i) > 128) continue;
            goodChars += file_string[i];
        }
    
        
        file_string = goodChars;
        alert('Table successfully detected');
        const input = window.prompt("Filename:");
        if (input === null) {
            table.style='background-color:white';
            return;
        }
        var filename = input + ".csv";
    
        var element = document.createElement('a');
        element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(file_string));
        element.setAttribute('download', filename);
        document.body.appendChild(element);
        element.click();

        table.style='background-color:white';
        //let element = document.createElement("a");
        //let csvData = new Blob([textInput], { type: "text/csv;charset=utf-8" });
        //let csvUrl = URL.createObjectURL(csvData);
        //element.href = csvUrl;
        //element.target = "_blank";
        //element.download = filename + ".csv";
        //element.click();
    
    }



    var tables = document.getElementsByTagName("table");
    var last_element = null;

    var highlightedTable = null;

    var table_selected = false;

    document.body.addEventListener("mousemove", (event) => {

        if(table_selected) return;


        if(last_element!=null) last_element.style="background-color:white";
        //var element_under_cursor = document.elementFromPoint(event.x, event.y);
            
        // iterate through tables on page
        for(var i=0; i<tables.length; i++){
            table = tables[i];
            var position = table.getBoundingClientRect();

            // identify table to be highlighted
            if(event.x >position.left && event.x<position.right&&event.y>position.top&&event.y<position.bottom){
                    
                // table to be highlighted
                last_element = table;
                    
                highlightedTable = table;

                // highlight table 
                table.style="background-color:yellow;";
                    console.log("khsabdkhasbvck")
                // change cursor to clickable
                table.style.cursor = "pointer";
            }
        }
    });

    var table_number = 0;

    document.body.addEventListener("click", (event) => {
        if(table_selected){
            return;
        }
        console.log("100");

        if(highlightedTable==null) return;
            console.log("highlighted==null");
            console.log("110");

        var position = highlightedTable.getBoundingClientRect();
        if(event.x >position.left && event.x<position.right&&event.y>position.top&&event.y<position.bottom){
            console.log("position")
            // we've clicked on a highlighted table

            table_selected = true;
            parseTable(highlightedTable);
        }

    });
    ///////////////////
    
 
})()

