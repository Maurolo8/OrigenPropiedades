let Inicio = {
    propiedades: [],
    inicio: function(){
        this.propiedades = memoria.leer("propiedades")
        this.listar()
    },

    listar: function (){
        let listado = "";

        
        for (let objPropiedad of this.propiedades) {
            listado += '<hr>'+
                '<div class="row">'+
                '    <div class="col-sm-4 text-center">'+
                '        <a href="PROPIEDAD.html?id='+objPropiedad.id+'">'+
                '            <img class="img_chica" src="'+objPropiedad.foto+'" />'+
                '        </a>'+
                '    </div>'+   
                '    <div class="col-sm-8">'+
                '        <div class="row">'+
                '            <div class="col-sm-8">'+
                '                <p>Tipo: '+objPropiedad.propiedad+'</p>'+
                '                <p>Descripcion: '+objPropiedad.descripcion+'</p>'+
                '                <p>Metros cuadrados: '+objPropiedad.mts+'</p>'+
                '            </div>'+
                '            <div class="col-sm-4">'+
                '                <h5>$'+objPropiedad.precio+'</h5>'+
                '            </div>'+
                '        </div>'+
                '    </div>'+
                '</div>';
        }

        document.getElementById('listado').innerHTML = listado;
    },
    cargar: function(){
        this.propiedades = memoria.leer('propiedades')

        let id = new URLSearchParams(window.location.search).get('id')
        let objPropiedad = this.buscarPropiedades(id)

        if(!objPropiedad){
            document.getElementById('botoncomprar').style.display = 'none';
            document.getElementById('texto').innerHTML = '<img class="img_grande" src="imagenes/logo1.png" id="ImagenError"/>'    
            document.getElementById('imagen').innerHTML= '<br><h3>ID incorrecto! Vuelva a la página anterior</h3><br>'    
        }
        
        document.getElementById('titulo').innerHTML = objPropiedad.propiedad
        document.getElementById('imagen').innerHTML = '<img class="img_grande" src="'+objPropiedad.foto+'" />'
        document.getElementById('texto').innerHTML = '<br><p> Descripción: '+objPropiedad.descripcion+'</p>'+
        '                                           <p>Precio: $'+objPropiedad.precio+'</p>'+
        '                                           <p>Barrio: '+objPropiedad.barrio+'</p>'+
        '                                           <p>Dirección: '+objPropiedad.direccion+'</p>'+
        '                                           <hr><p id="caracteristicaspropiedad">Baños: '+objPropiedad.banos+'</p>'+
        '                                           <hr><p id="caracteristicaspropiedad">Dormitorios: '+objPropiedad.dormitorios+'</p>'+
        '                                           <hr><p id="caracteristicaspropiedad">Garaje: '+objPropiedad.garaje+'</p>'+
        '                                           <hr><p id="caracteristicaspropiedad">Metros Cuadrados: '+objPropiedad.mts+'m2</p>'+
        '                                           <hr><p id="caracteristicaspropiedad">Gastos Comunes: '+objPropiedad.gastosC+'</p>'+
        '                                           <hr><p id="caracteristicaspropiedad">Estufa: '+objPropiedad.estufa+'</p>'+
        '                                           <hr><p id="caracteristicaspropiedad">Patio: '+objPropiedad.patio+'</p>'+
        '                                           <hr><p id="caracteristicaspropiedad">Barbacoa: '+objPropiedad.barbacoa+'</p>'+
        '                                           <hr><p id="caracteristicaspropiedad">Piscina: '+objPropiedad.piscina+'</p>'
        
    },
    buscarPropiedades: function(id){
        for(let objPropiedad of this.propiedades){
            if(objPropiedad.id == id){
                return objPropiedad
            }
        }
        return null
    },

    filtrar: function(){
        let listado = "";
        let filtrados = memoria.leer("propiedades")
        let filtro1 = []
        if(document.getElementById('filtrobarrio').value!=""){
            for (let objPropiedad of filtrados) {
                if(objPropiedad.barrio==document.getElementById('filtrobarrio').value){
                    filtro1.push(objPropiedad)
                }
            }
            filtrados = filtro1
            filtro1 = []
        }
        if(document.getElementById('filtrocuartos').value!=0){
            for (let objPropiedad of filtrados) {
                if(objPropiedad.dormitorios==document.getElementById('filtrocuartos').value){
                    filtro1.push(objPropiedad)
                }
            }
            filtrados = filtro1
            filtro1 = []
        }
        if(document.getElementById('filtropresupuestomin').value<document.getElementById('filtropresupuestomax').value){
            for (let objPropiedad of filtrados) {
                if((objPropiedad.precio>=document.getElementById('filtropresupuestomin').value)&&(objPropiedad.precio<=document.getElementById('filtropresupuestomax').value)){
                    filtro1.push(objPropiedad)
                }
            }
            filtrados = filtro1
            filtro1 = []
        }
        for(let objPropiedad of filtrados){
            listado += '<hr>'+
            '<div class="row">'+
            '    <div class="col-sm-4 text-center">'+
            '        <a href="PROPIEDAD.html?id='+objPropiedad.id+'">'+
            '            <img class="img_chica" src="'+objPropiedad.foto+'" />'+
            '        </a>'+
            '    </div>'+   
            '    <div class="col-sm-8">'+
            '        <div class="row">'+
            '            <div class="col-sm-8">'+
            '                <p>Tipo: '+objPropiedad.propiedad+'</p>'+
            '                <p>Descripcion: '+objPropiedad.descripcion+'</p>'+
            '                <p>Metros cuadrados: '+objPropiedad.mts+'</p>'+
            '            </div>'+
            '            <div class="col-sm-4">'+
            '                <h5>$'+objPropiedad.precio+'</h5>'+
            '            </div>'+
            '        </div>'+
            '    </div>'+
            '</div>';
        }
        if(listado!=""){
            return document.getElementById('listado').innerHTML = listado;
        }
        document.getElementById('listado').innerHTML = '<br><h3>Propiedad con esas características no encontrada</h3><br>' 
    },
}