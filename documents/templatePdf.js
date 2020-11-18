module.exports = ({
  fName,
  lName,
  age,
  currentProfile,
  email,
  phone,
  section,
}) => {
  var output = '';
  section.forEach((nSection) => {
    output += `<h3>${nSection.title}</h3><p>${nSection.body}</p>`;
  });
  //console.log(output);
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                table{width:100%;}
                td {
                    width: 50%;
                    vertical-align: top;
                    text-align: left;
                    padding: 10px 30px;
                }
               
                #sections{
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                }
            </style>
        </head>
        <body>
            <table>
                <tr>
                <td><div id='first-col'></div></td> 
                <td><div id='second-col'></div></td>
                </tr>
            </table>            
            <div id='sections'></div>
            <script>
                const firstCol = "<h2>First Name: ${fName}<h2><h2>Last Name: ${lName}<h2><h2>Age: ${age}<h2><h2>Current Profile: ${currentProfile}<h2>";   
                const secondCol = "<h2>Email: ${email}<h2><h2>Phone: ${phone}<h2>";              
                document.getElementById('first-col').innerHTML = firstCol;
                document.getElementById('second-col').innerHTML = secondCol;   
                document.getElementById('sections').innerHTML = '${output}';          
             </script>
        </body>        
        </html>
    `;
};
