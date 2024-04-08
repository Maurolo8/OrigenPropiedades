let Propiedad = {
ultimoidPropiedades : 0,
propiedades:[],

inicio:function(){
    this.propiedades=memoria.leer("propiedades")
    this.ultimoidPropiedades=memoria.leer('ultimoidPropiedades')
    if(this.propiedades=[]){
        this.juegodedatos()
    }
    this.cargarTipos()
    document.getElementById('div-caracteristicas').style.display = 'none';
    document.getElementById('div-gastosC').style.display = 'none'
    this.listar()
},

crear:function(id,propiedad,precio,barrio, direccion, banos, dormitorios, garaje, mts, foto, descripcion,gastosC,estufa,patio,piscina,barbacoa){
    return {
        id:          id,
        propiedad:   propiedad,
        precio:      precio,
        barrio:      barrio,
        direccion:   direccion,
        banos:       banos,
        dormitorios: dormitorios,
        garaje:      garaje,
        mts:         mts,
        foto:        foto,
        descripcion: descripcion,
        gastosC:     gastosC,
        estufa:      estufa,
        patio:       patio,
        piscina:     piscina,
        barbacoa:    barbacoa,
    }
},

alta: function(){

    let id              = this.generarid()
    id=parseInt(id)
    let propiedad       = document.getElementById("tipo").value
    let precio          = parseFloat(document.getElementById("precio").value)
    let barrio          = document.getElementById("barrio").value
    precio              = precio.toFixed(2)
    precio              = parseFloat(precio)
    let estufa  = 'No'
    let patio   = 'No'
    let piscina = 'No'
    let barbacoa= 'No'
    let gastosC = 0
    if(propiedad == "Apartamento"){
        gastosC             = parseFloat(document.getElementById("gastosC").value)
        gastosC             = gastosC.toFixed(2)
        gastosC             = parseFloat(gastosC)
    }
    if(propiedad == 'Casa'){
        if(document.getElementById('caracteristicasEs').checked== true){
            estufa= 'Si'
        }
        if(document.getElementById('caracteristicasPa').checked== true){
            patio= 'Si'
        }
        if(document.getElementById('caracteristicasPi').checked== true){
            piscina= 'Si'
        }
        if(document.getElementById('caracteristicasBa').checked== true){
            barbacoa= 'Si'
        }
    }
    let direccion       = document.getElementById("direccion").value
    let banos           = parseFloat(document.getElementById("banos").value)
    let dormitorios     = parseFloat(document.getElementById("dormitorios").value)
    let garaje          = document.getElementById("garaje").value
    let mts             = parseInt(document.getElementById("mts").value)
    let foto            = document.getElementById("foto").value
    let descripcion     = document.getElementById("descripcion").value

    if (this.validar(propiedad,precio,barrio, direccion, banos, dormitorios, garaje, mts, foto, descripcion)==true){
        let objPropiedad = this.crear(id,propiedad,precio,barrio, direccion, banos, dormitorios, garaje, mts, foto, descripcion, gastosC, estufa,patio,piscina,barbacoa)
        this.propiedades.push(objPropiedad)
        this.listar()
        this.limpiar()
        memoria.escribir('propiedades', this.propiedades)
    }
    else{
        this.ultimoidPropiedades--
        memoria.escribir('ultimoidPropiedades', this.ultimoidPropiedades)
    }
},

baja: function(){
    let id = document.getElementById("id").value
    let pos = this.buscarpos(id, this.propiedades)

    if(pos<0){
        alert("Error en dar de baja, Propiedad con este ID no encontrado")
    }
    else{
        this.propiedades.splice(pos,1)
        this.listar()
        alert('Propiedad dada de baja con exito')
    }
    memoria.escribir('propiedades', this.propiedades)
    this.limpiar()
},

modificar: function(){
    let id = document.getElementById('id').value
    let pos = this.buscarpos(id,this.propiedades)
    if(pos<0){
        alert('Error al modificar. Propiedad inexistente')
    }
    else{
            let objPropiedad = this.propiedades[pos]
            let propiedad       = document.getElementById("tipo").value
            let precio          = parseFloat(document.getElementById("precio").value)
            let barrio          = document.getElementById("barrio").value
            precio              = precio.toFixed(2)
            precio              = parseFloat(precio)
            let estufa  = 'No'
            let patio   = 'No'
            let piscina = 'No'
            let barbacoa= 'No'
            let gastosC = 0
            if(propiedad == "Apartamento"){
                gastosC             = parseFloat(document.getElementById("gastosC").value)
                gastosC             = gastosC.toFixed(2)
                gastosC             = parseFloat(gastosC)
            }
            if(propiedad == 'Casa'){
                if(document.getElementById('caracteristicasEs').checked== true){
                    estufa= 'Si'
                }
                if(document.getElementById('caracteristicasPa').checked== true){
                    patio= 'Si'
                }
                if(document.getElementById('caracteristicasPi').checked== true){
                    piscina= 'Si'
                }
                if(document.getElementById('caracteristicasBa').checked== true){
                    barbacoa= 'Si'
                }
            }
            let direccion       = document.getElementById("direccion").value
            let banos           = parseFloat(document.getElementById("banos").value)
            let dormitorios     = parseFloat(document.getElementById("dormitorios").value)
            let garaje          = document.getElementById("garaje").value
            let mts             = parseFloat(document.getElementById("mts").value)
            let foto            = document.getElementById("foto").value
            let descripcion     = document.getElementById("descripcion").value
            if (this.validar(propiedad,precio,barrio, direccion, banos, dormitorios, garaje, mts, foto, descripcion)==true){
            objPropiedad.propiedad   = propiedad
            objPropiedad.precio      = precio
            objPropiedad.barrio      = barrio
            objPropiedad.estufa      = estufa
            objPropiedad.patio       = patio
            objPropiedad.piscina     = piscina
            objPropiedad.barbacoa    = barbacoa
            objPropiedad.gastosC     = gastosC
            objPropiedad.direccion   = direccion
            objPropiedad.banos       = banos
            objPropiedad.dormitorios = dormitorios
            objPropiedad.garaje      = garaje
            objPropiedad.mts         = mts
            objPropiedad.foto        = foto
            objPropiedad.descripcion = descripcion

            memoria.escribir('propiedades', this.propiedades)
            this.listar()
            alert('Propiedad modificada con éxito')
        }
    }
    this.limpiar()
},

listar: function (){
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let objPropiedad of this.propiedades) {
    const renglon = document.createElement("option");
        renglon.value = objPropiedad.id;
        renglon.text = "Id :"+objPropiedad.id+' - '+ "Tipo: " + objPropiedad.propiedad + ", Barrio: "+objPropiedad.barrio + ", Dirección: "+objPropiedad.direccion + ", Precio: " + objPropiedad.precio + ", Descripción: "+ objPropiedad.descripcion;
        lista.add(renglon);
    }

},

buscarpos: function (id, array) {
    for (let pos = 0; pos < array.length; pos++) {
        let objPropiedad = array[pos];
        if (objPropiedad.id == id) {
            return pos;
        }
    }
    return -1;
},

limpiar: function(){
    document.getElementById("abmPropiedades").reset();
},

seleccionar: function(){
    let numero = document.getElementById('lista').value
    for(let objPropiedad of this.propiedades){
        if(numero==objPropiedad.id){
            document.getElementById("id").value            = objPropiedad.id
            document.getElementById("tipo").value          = objPropiedad.propiedad
            this.CaracteristicaPropiedad()
            document.getElementById("precio").value        = objPropiedad.precio
            document.getElementById("barrio").value        = objPropiedad.barrio
            document.getElementById("direccion").value     = objPropiedad.direccion
            document.getElementById("banos").value         = objPropiedad.banos
            document.getElementById("dormitorios").value   = objPropiedad.dormitorios
            document.getElementById("garaje").value        = objPropiedad.garaje
            document.getElementById("mts").value           = objPropiedad.mts
            document.getElementById("foto").value          = objPropiedad.foto
            document.getElementById("descripcion").value   = objPropiedad.descripcion
            document.getElementById('gastosC').value       = objPropiedad.gastosC
        }
    }
},

cargarTipos: function (){
    const lista = document.getElementById("tipo").options;
    lista.length = 0;
    elem = new Option("Seleccione un tipo");
    lista.add(elem);
    elem = new Option("Apartamento");
    lista.add(elem);
    elem = new Option("Casa");
    lista.add(elem);
  },

CaracteristicaPropiedad: function(){
    let tipo = document.getElementById('tipo').value
    switch (tipo) {
        case 'Casa':
            document.getElementById('div-caracteristicas').style.display = 'block';
            document.getElementById('div-gastosC').style.display = 'none';
          break;

        case 'Apartamento':
            document.getElementById('div-caracteristicas').style.display = 'none';
            document.getElementById('div-gastosC').style.display = 'block';
            break;
        default:
            document.getElementById('div-caracteristicas').style.display = 'none';
            document.getElementById('div-gastosC').style.display = 'none';
          break;
      }
},

juegodedatos: function(){
     let datos=[
        {
            id:          1,
            propiedad:   'Casa',
            precio:      40000,
            barrio:      "Por allá",
            direccion:   'De la puerta para adentro',
            banos:       2,
            dormitorios: 3,
            garaje:      "Si",
            mts:         120,
            foto:        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6zTB5bRfIKr3MkJOgAQVWzvM70nSg_000gg&usqp=CAU",
            descripcion: 'Bien ubicada, segura y cuenta con vista panoramica',
            gastosC:     0,
            estufa:      'Si',
            patio:       'Si',
            piscina:     'No',
            barbacoa:    "Si",
        },
        {
            id:          2,
            propiedad:   "Apartamento",
            precio:      10000,
            barrio:      'Cerca de ahí',
            direccion:   "Patagonia",
            banos:       1,
            dormitorios: 2,
            garaje:      'No',
            mts:         80,
            foto:        "https://viajerosexploradores.com/imagenes/Los-9-barrios-mas-peligrosos-de-Espana.jpg",
            descripcion: "Cómodo ambiente con buenos vecinos y un barrio seguro",
            gastosC:     55,
            estufa:      "No",
            patio:       "No",
            piscina:     "No",
            barbacoa:    'No',
        },
        {
            id:          3,
            propiedad:   "Casa",
            precio:      60000,
            barrio:      'En aquel lado',
            direccion:   "allá",
            banos:       1,
            dormitorios: 3,
            garaje:      'No',
            mts:         120,
            foto:        "https://media.revistaad.es/photos/63a4171a2f9ecb52de3993d8/master/w_1600%2Cc_limit/TS4_About-The-Sims_Media-Hero-Tile_16x9_02.jpeg",
            descripcion: "Un espacio amplio para toda la familia. Ambiente acogedor",
            gastosC:     0,
            estufa:      "Si",
            patio:       "Si",
            piscina:     "Si",
            barbacoa:    'No',
        },
    ]
    for (let objPropiedad of datos){
        this.propiedades.push(objPropiedad)
        this.listar()
        memoria.escribir('propiedades', this.propiedades)
    }
},


validar:function(propiedad,precio,barrio, direccion, banos, dormitorios, garaje, mts, foto, descripcion){
    let valid = true
    if(propiedad=="Seleccione un tipo"){
        alert("Debe ingresar una Propiedad")
        valid=false
        return valid
    }
    if(!precio){
        alert("Debe ingresar un Precio")
        valid=false
        return valid
    }
    if(!barrio){
        alert("Debe ingresar un Barrio")
        valid=false
        return valid
    }
    if(!direccion){
        alert("Debe ingresar una Direccion")
        valid=false
        return valid
    }
    if(mts<1){
        alert("Debe ingresar una cantidad de metros cuadrados positiva")
        valid=false
        return valid
    }
    if(!foto){
        alert("Debe ingresar una Foto")
        valid=false
        return valid
    }
    if(!descripcion){
        alert("Debe ingresar una Descripcion")
        valid=false
        return valid
    }
    if(banos<1){
        alert("Debe ingresar una Cantidad de baños positiva")
        valid=false
        return valid
    }
    if(dormitorios<1){
        alert("Debe ingresar una cantidad de dormitorios positiva")
        valid=false
        return valid
    }
    if(precio<1){
        alert("Debe ingresar un precio positivo")
        valid=false
        return valid
    }
    return valid
},

generarid: function() {
    this.ultimoidPropiedades++;
    memoria.escribir('ultimoidPropiedades', this.ultimoidPropiedades)
    return this.ultimoidPropiedades;
},
}