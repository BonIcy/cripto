export default{
    show(){
        $(document).ready(function() {
            // Almacenar el texto original (en caso de querer usarlo)
            //var originalText = $('#glitch-text').text();
        
            // Crear una función para generar texto "glitch"
            function generateGlitchText() {
                // Agregar texto aleatorio antes y después del original
                var randomText = "CRIPTOS";
                var randomText2 = "DMID"
                var glitchText = randomText +  randomText2;
        
                // Actualizar el atributo "data-text" del elemento
                $('#glitch-text').attr('data-text', glitchText);
            }
        
            // Llamar a la función de generación de texto cada 3 segundos
            setInterval(generateGlitchText, 100);
        });  
    }
}