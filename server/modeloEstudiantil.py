import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor  # Cambiar aquí
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Cargar datos
df = pd.read_csv('rendimientoEstudiantilOptimo.csv')  # Reemplaza con tu archivo real

# Codificadores
le_asignatura = LabelEncoder()
df['cursos'] = le_asignatura.fit_transform(df['cursos'])

# Separar features y target
X = df.drop(['desempeno', 'estudiante_ID'], axis=1)
y = df['desempeno'].astype(float)  # Asegura que sea float para regresión

# Dividir datos
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Crear modelo de regresión
modelo = RandomForestRegressor(random_state=42)
modelo.fit(X_train, y_train)

# Evaluar
y_pred = modelo.predict(X_test)
print("MSE:", mean_squared_error(y_test, y_pred))
print("R2:", r2_score(y_test, y_pred))

# Guardar modelo y encoder
joblib.dump(modelo, 'modelo_estudiante.pkl')
joblib.dump(le_asignatura, 'encoder_asignatura.pkl')