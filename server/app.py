from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Cargar modelo y encoder de asignatura (porque asignatura llega en texto)
modelo = joblib.load('modelo_estudiante.pkl')
le_asignatura = joblib.load('encoder_asignatura.pkl')

@app.route('/', methods=['GET'])
def home():
    return jsonify({"mensaje": "Servidor funcionando correctamente"})

@app.route('/predecir', methods=['POST'])
def predecir_desempeno():
    try:
        datos = request.json

        # Transformar solo asignatura (de texto a número)
        asignatura_cod = le_asignatura.transform([str(datos['asignatura'])])[0]

        # Crear DataFrame con lo que llega (genero y grado ya son números)
        entrada = pd.DataFrame([{
            'genero': datos['genero'],
            'grado': datos['grado'],
            'cursos': asignatura_cod,
            'manosLevantadas': datos['manos_levantadas'],
            'recursosBuscados': datos['recursos_visitados'],
            'diasAusentes': datos['dias_de_ausencia'],
            'participacion': datos['participacion']
        }])
        entrada = entrada[['genero', 'grado', 'cursos', 'manosLevantadas', 'recursosBuscados', 'participacion', 'diasAusentes']]
        prediccion = modelo.predict(entrada)[0]
        prediccion = float(prediccion) * 100
        prediccion = round(prediccion, 2)

        respuesta = {
            "desempeno_predicho": prediccion,
            "datos_usados": {
                "cursos": int(asignatura_cod),
                "manosLevantadas": datos['manos_levantadas'],
                "recursosBuscados": datos['recursos_visitados'],
                "diasAusentes": datos['dias_de_ausencia'],
                "participacion": datos['participacion']
            }
        }

        return jsonify(respuesta)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
