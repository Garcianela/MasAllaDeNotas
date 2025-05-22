from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
import sklearn
print(sklearn.__version__)

# Cargar modelo y encoder de asignatura (porque asignatura llega en texto)
modelo = joblib.load('modelo_estudiante.pkl')
le_asignatura = joblib.load('encoder_asignatura.pkl')

@app.route('/predecir', methods=['POST'])
def predecir_desempeno():
    try:
        datos = request.json

        # Transformar solo asignatura (de texto a número)
        asignatura_cod = le_asignatura.transform([str(datos['asignatura'])])[0]

        # Crear DataFrame con lo que llega (genero y grado ya son números)
        entrada = pd.DataFrame([{
            'genero': datos['genero'],        # ya número
            'grado': datos['grado'],          # ya número
            'cursos': asignatura_cod,         # codificado aquí
            'manosLevantadas': datos['manos_levantadas'],
            'recursosBuscados': datos['recursos_visitados'],
            'diasAusentes': datos['dias_de_ausencia'],
            'participacion': datos['participacion']
        }])
        entrada = entrada[['genero', 'grado', 'cursos', 'manosLevantadas', 'recursosBuscados', 'participacion', 'diasAusentes']]
        prediccion = modelo.predict(entrada)[0]
        prediccion = int(prediccion)  # Esto es clave
        return jsonify({"desempeno_predicho": prediccion})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
