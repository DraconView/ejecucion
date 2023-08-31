/* ManejoDeArrays

* push() - Agrega un elemento al final del array
* pop() - Elimina el último elemento del array
* shift() - Elimina el primer elemento del array
* unshift() - Agrega un elemento al principio del array
* splice() - Elimina elementos de un array y, opcionalmente, inserta nuevos elementos en su lugar, devolviendo los elementos eliminados.
* slice() - Extrae una sección de un array y devuelve un nuevo array.
* concat() - Devuelve un nuevo array que contiene los arrays o valores concatenados.
* indexOf() - Devuelve el primer índice del elemento que coincida con el valor especificado, o -1 si ninguno es encontrado.
* lastIndexOf() - Devuelve el último índice del elemento que coincida con el valor especificado, o -1 si ninguno es encontrado.
* includes() - Determina si un array contiene un determinado elemento, devuelve true o false según corresponda.
* join() - Une todos los elementos de una matriz (u objeto similar) en una cadena y la devuelve.
* reverse() - Invierte el orden de los elementos de un array.   
* sort() - Ordena los elementos de un array localmente y devuelve el array.
* filter() - Crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
* find() - Devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.   
* findIndex() - Devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada.
* forEach() - Ejecuta la función indicada una vez por cada elemento del array.
* map() - Crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
* reduce() - Aplica una función a un acumulador y a cada valor de un array (de izquierda a derecha) para reducirlo a un único valor.    
* some() - Comprueba si al menos un elemento del array cumple con la condición implementada por la función proporcionada.
* every() - Comprueba si todos los elementos del array cumplen con la condición implementada por la función dada.
* toString() - Devuelve una cadena que representa al objeto especificado.
* toLocaleString() - Devuelve una cadena que representa a los elementos del array.
* toSource() - Devuelve una cadena que representa al código fuente del array.
* length - Propiedad que establece o devuelve el número de elementos de un array.
* prototype - Permite agregar propiedades a un objeto Array.    
* arguments - Un objeto similar a un array correspondiente a los argumentos pasados a una función.
* caller - Función que ha llamado a la función actual.
* from() - Crea una nueva instancia de Array a partir de un objeto iterable.
* isArray() - Devuelve true si una variable es un array, en caso contrario devuelve false.
* of() - Crea una nueva instancia de Array con un número variable de elementos pasados como argumentos, independientemente del número o del tipo.   
* copyWithin() - Copia elementos de un array dentro del mismo array y los pega en otra posición en ese mismo array, sin borrar los elementos copiados.
* fill() - Rellena todos los elementos de un array desde una posición de inicio a una posición final con un valor estático.
* flat() - Devuelve un nuevo array con todos los elementos de un sub-array concatenados recursivamente hasta la profundidad especificada.
* flatMap() - Devuelve un nuevo array con el resultado de la función de mapeo aplicado a cada elemento.
* keys() - Devuelve un nuevo Array Iterator que contiene las claves de cada índice en el array.
* values() - Devuelve un nuevo Array Iterator que contiene los valores de cada índice en el array.
* entries() - Devuelve un nuevo Array Iterator que contiene los pares clave/valor para cada índice en el array.
* quantumInsert() - Inserta un elemento en un array ordenado.
* quantumRemove() - Elimina un elemento de un array ordenado.
* quantumSearch() - Busca un elemento en un array ordenado.
* quantumTraverse() - Recorre un array ordenado.
* quantumLength() - Devuelve el número de elementos de un array ordenado.
* quantumMerge() - Fusiona dos arrays ordenados.
* quantumSort() - Ordena un array ordenado.
* quantumSelect() - Selecciona un elemento de un array ordenado.
* quantumRank() - Devuelve el rango de un elemento en un array ordenado.
* quantumRange() - Devuelve el rango de un elemento en un array ordenado.
* quantumMin() - Devuelve el elemento mínimo de un array ordenado.  
* quantumMax() - Devuelve el elemento máximo de un array ordenado.
* quantumMedian() - Devuelve la mediana de un array ordenado.
* quantumPercentile() - Devuelve el percentil de un array ordenado.
* quantumQuantile() - Devuelve el cuantil de un array ordenado.
* quantumMode() - Devuelve la moda de un array ordenado.
* quantumMean() - Devuelve la media de un array ordenado.
* quantumVariance() - Devuelve la varianza de un array ordenado.
* quantumStandardDeviation() - Devuelve la desviación estándar de un array ordenado.
* quantumCovariance() - Devuelve la covarianza de dos arrays ordenados.
* quantumCorrelation() - Devuelve la correlación de dos arrays ordenados.
* quantumSkewness() - Devuelve la asimetría de un array ordenado.
* quantumKurtosis() - Devuelve la curtosis de un array ordenado.
* quantumHistogram() - Devuelve el histograma de un array ordenado.
* quantumFrequency() - Devuelve la frecuencia de un elemento en un array ordenado.
* quantumFrequencyTable() - Devuelve la tabla de frecuencias de un array ordenado.
* quantumFrequencyDistribution() - Devuelve la distribución de frecuencias de un array ordenado.
* quantumFrequencyPolygon() - Devuelve el polígono de frecuencias de un array ordenado.
* quantumCumulativeFrequency() - Devuelve la frecuencia acumulada de un array ordenado.
* quantumCumulativeFrequencyTable() - Devuelve la tabla de frecuencias acumuladas de un array ordenado.
* quantumCumulativeFrequencyDistribution() - Devuelve la distribución de frecuencias acumuladas de un array ordenado.
* quantumCumulativeFrequencyPolygon() - Devuelve el polígono de frecuencias acumuladas de un array ordenado.
* quantumRelativeFrequency() - Devuelve la frecuencia relativa de un array ordenado.
* quantumRelativeFrequencyTable() - Devuelve la tabla de frecuencias relativas de un array ordenado.
* quantumRelativeFrequencyDistribution() - Devuelve la distribución de frecuencias relativas de un array ordenado.
* quantumRelativeFrequencyPolygon() - Devuelve el polígono de frecuencias relativas de un array ordenado.
* quantumRelativeCumulativeFrequency() - Devuelve la frecuencia relativa acumulada de un array ordenado.
* quantumRelativeCumulativeFrequencyTable() - Devuelve la tabla de frecuencias relativas acumuladas de un array ordenado.
* quantumRelativeCumulativeFrequencyDistribution() - Devuelve la distribución de frecuencias relativas acumuladas de un array ordenado.
* quantumRelativeCumulativeFrequencyPolygon() - Devuelve el polígono de frecuencias relativas acumuladas de un array ordenado.
* quantumFrequencyHistogram() - Devuelve el histograma de frecuencias de un array ordenado.
* quantumRelativeFrequencyHistogram() - Devuelve el histograma de frecuencias relativas de un array ordenado.
* quantumCumulativeFrequencyHistogram() - Devuelve el histograma de frecuencias acumuladas de un array ordenado.
* quantumRelativeCumulativeFrequencyHistogram() - Devuelve el histograma de frecuencias relativas acumuladas de un array ordenado.
* quantumFrequencyPolygonHistogram() - Devuelve el histograma de polígonos de frecuencias de un array ordenado.
* window() - Devuelve una ventana de un array ordenado.
*/




