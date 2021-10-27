function inicioDoctor(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-doctor");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id)

            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function inicioClient(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Client/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient)

            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function inicioScore(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Score/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (idScore, score) {
                $select.append('<option value='+score.idScore+'>'+score.score+'</option>');
                console.log("select "+score.idScore)

            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function traerInformacion(){

    $.ajax({
        url:"http://129.151.121.62:8081/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json",
        success:function(respuesta){
            console.log(respuesta);
            mostrarRespuesta(respuesta)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}


function mostrarRespuesta(respuesta){

    let myTable = "<table>";

    myTable+="<tr>";
    myTable+="<th>"+"ID"+"</th>";
    myTable+="<th>"+"FECHA DE INICIO"+"</th>";
    myTable+="<th>"+"FECHA DE DEVOLUCION"+"</th>";
    myTable+="<th>"+"ESTADO"+"</th>";
    myTable+="<th>"+"MEDICO"+"</th>";
    myTable+="<th>"+"CLIENTE"+"</th>";
    myTable+="<th>"+"CALIFICACION DE RESERVA"+"</th>";
    myTable+="<th>"+"Actualizar Registro"+"</th>";
    myTable+="<th>"+"Eliminar Registro"+"</th>";
    myTable+="<tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idReservation+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].doctor.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].score.score+"</td>";
        myTable+='<td><center><button onclick="editarElemento('+respuesta[i].idReservation+')">Actualizar</button><center></td>';
        myTable+='<td><center><button onclick="borrarElemento('+respuesta[i].idReservation+')">Borrar</button><center></td>';
        myTable+="</tr>"
    }

    myTable+="</table>";
    $("#resultado").html(myTable);

}


function guardarElemento(){

    if($("#startDate").val() == "" || $("#devolutionDate").val() == ""){
        alert("Por favor llene todos los campos de registro")
    }
    else{

        let myData={
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            doctor:{id:+$("#select-doctor").val()},
            client:{id:+$("#select-client").val()},
            score:{id:+$("#select-score").val()},
        };

        console.log(myData);
        let dataToSend=JSON.stringify(myData);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Reservation/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            contentType: "application/json",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultado").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                $("#doctor").val("");
                $("#client").val("");
                $("#score").val("");
                traerInformacion();
                console.log("Se ha añadido el registro");
                alert("Se ha añadido el registro")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        });
    }    

}


function editarElemento(idElemento){

    if($("#startDate").val() == "" || $("#devolutionDate").val() == ""){
        alert("Por favor llene todos los campos de registro")
    }
    else{

        let myData={
            idReservation:idElemento,
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            doctor:{id:+$("#select-doctor").val()},
            client:{id:+$("#select-client").val()},
            score:{id:+$("#select-score").val()},
        };

        console.log(myData);
        let dataToSend=JSON.stringify(myData);

        $.ajax({
            url:"http://129.151.121.62:8081/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado").empty();
                $("#idReservation").val("");
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                $("#doctor").val("");
                $("#client").val("");
                $("#score").val("");
                traerInformacion();
                console.log("Se ha actualizado el registro");
                alert("Se ha actualizado el registro")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        });
    }

}


function borrarElemento(idElemento){

    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.121.62:8081/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        datatype:"JSON",
        contentType:"application/JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            traerInformacion();
            console.log("Se ha eliminado el registro");
            alert("Se ha eliminado el registro")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
        }
    });

}

