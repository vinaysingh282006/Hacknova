# 🤖 AI Pollution Prediction - User Guide

## Overview

The AI Prediction module uses **TensorFlow.js** to train machine learning models directly in your browser to predict future pollution levels based on historical data.

---

## 📊 Features

### 1. **Data Loading**
- **Load City Dataset** (2.5 MB): Daily pollution data from 2015+ for major Indian cities
- **Load Station Dataset** (214 MB): Hourly pollution data from 2017+ (more granular)
- **Upload Custom CSV**: Support for your own pollution datasets

### 2. **Data Visualizations**

#### Quick Statistics
- Total Records
- Number of Locations
- Time Span Covered
- Average PM2.5 Levels

#### Interactive Charts
1. **Time Series Chart**: Shows pollution trends over months/years
2. **Pollutant Comparison**: Bar chart comparing average levels of PM2.5, PM10, NO2, SO2, CO, O3
3. **Seasonal Patterns**: Heatmap showing which months have higher pollution
4. **AQI Distribution**: Pie chart showing percentage of days in each AQI category

#### Geographic Map
- Interactive map showing pollution hotspots
- Color-coded markers based on pollution severity
- Hover tooltips with detailed statistics

### 3. **AI Model Training**

#### Model Architecture
- **LSTM Neural Network** (Long Short-Term Memory)
- 2 LSTM layers with dropout for preventing overfitting
- Optimized for time series forecasting

#### Training Options
- **Target Variable**: Choose what to predict (PM2.5, PM10, NO2, or AQI)
- **Prediction Window**: 1 day, 7 days, or 30 days ahead
- **Real-time Progress**: Watch training loss and accuracy improve

#### Training Process
1. Data is normalized using mean and standard deviation
2. Sequences of 7 consecutive days are used as input
3. Model learns patterns to predict the next day(s)
4. Validation split ensures the model generalizes well

### 4. **Making Predictions**

Once trained, you can:
- Select any location from your dataset
- Choose a future date
- Get predicted pollution value with confidence interval
- See AQI category (Good, Moderate, Unhealthy, etc.)

---

## 🚀 How to Use

### Step 1: Load Data

Click one of the dataset buttons:
```
[Load City Dataset]  ← Start here (smaller, faster)
[Load Station Dataset] ← More detailed, takes longer
```

**What happens:**
- CSV file is parsed in the background
- Data is cleaned and processed
- Statistics are calculated
- All charts update automatically

### Step 2: Explore Visualizations

Scroll down to see:
- 📊 **4 statistical cards** at the top
- 📈 **4 interactive charts** showing different aspects
- 🗺️ **Geographic map** with pollution hotspots

**Tip:** Hover over charts and map markers for details!

### Step 3: Train the AI Model

In the "Train AI Model" section:

1. **Select Target Variable** (default: PM2.5)
   - PM2.5 = Fine particles (most health-critical)
   - PM10 = Coarse particles
   - NO2 = Nitrogen dioxide
   - AQI = Overall air quality index

2. **Select Prediction Window** (default: 1 day)
   - 1 Day = Short-term forecast
   - 7 Days = Weekly forecast
   - 30 Days = Monthly forecast

3. Click **"🚀 Start Training Model"**

**Watch the magic happen:**
```
Training Progress: [████████░░] 80%
Training Loss: 0.0234
Accuracy: 87.3%
```

**Training Time:**
- City dataset: ~30-60 seconds
- Station dataset: ~2-5 minutes

### Step 4: Make Predictions

After training completes:

1. **Select Location** (e.g., "Delhi", "Mumbai")
2. **Select Date** (tomorrow or future date)
3. Click **"Predict"**

**Results show:**
- 🎯 **Predicted Value**: e.g., "65.3 μg/m³"
- 📊 **Confidence**: e.g., "87.3%"
- 🚨 **AQI Category**: e.g., "Unhealthy for Sensitive Groups"
- 📈 **Confidence Interval Chart**: Visual range of possible values

---

## 📚 Understanding the Results

### AQI Categories (PM2.5 based)

| PM2.5 Range | Category | Color | Health Impact |
|-------------|----------|-------|---------------|
| 0 - 12 | Good | 🟢 Green | Air quality is satisfactory |
| 12 - 35.4 | Moderate | 🟡 Yellow | Acceptable for most people |
| 35.4 - 55.4 | Unhealthy (SG) | 🟠 Orange | Sensitive groups may experience effects |
| 55.4 - 150.4 | Unhealthy | 🔴 Red | Everyone may begin to experience effects |
| 150.4 - 250.4 | Very Unhealthy | 🟣 Purple | Health warnings of emergency conditions |
| 250.4+ | Hazardous | 🟤 Brown | Health alert: everyone may experience serious effects |

### Confidence Intervals

The prediction shows three values:
- **Lower Bound**: Optimistic scenario (lower pollution)
- **Predicted Value**: Most likely outcome
- **Upper Bound**: Pessimistic scenario (higher pollution)

**Example:**
```
Lower Bound: 45.2 μg/m³
Prediction:  58.7 μg/m³  ← Most likely
Upper Bound: 72.1 μg/m³
Confidence: 85%
```

This means: "We're 85% confident the actual value will be between 45.2 and 72.1"

---

## 🔬 Technical Details

### Dataset Format

The AI system expects CSV files with these columns:

**City Dataset:**
- `City`: Location name
- `Date`: YYYY-MM-DD format
- `PM2.5`, `PM10`, `NO2`, `SO2`, `CO`, `O3`: Pollutant concentrations
- `AQI`: Air Quality Index (optional)

**Station Dataset:**
- `StationId`: Station identifier
- `Datetime`: YYYY-MM-DD HH:MM:SS format
- Same pollutant columns as above

### Model Architecture

```
Input Layer: [7 time steps × 1 feature]
    ↓
LSTM Layer 1: 64 units
    ↓
Dropout: 20% (prevents overfitting)
    ↓
LSTM Layer 2: 32 units
    ↓
Dropout: 20%
    ↓
Dense Layer: 16 units (ReLU activation)
    ↓
Output Layer: 1 value (predicted pollution)
```

### Optimization
- **Optimizer**: Adam (learning rate: 0.001)
- **Loss Function**: Mean Squared Error (MSE)
- **Metric**: Mean Absolute Error (MAE)
- **Data Normalization**: Z-score standardization

---

## 💡 Tips for Best Results

1. **Use the City Dataset first** - It's faster and easier to understand

2. **Start with PM2.5** - Most important pollutant for health

3. **Train for short-term predictions** - 1-day forecasts are more accurate than 30-day

4. **Check the data quality** - More records = better predictions
   - Good: 1000+ records
   - Better: 5000+ records
   - Best: 10000+ records

5. **Multiple training runs** - Each training is slightly different due to randomization

6. **Save your work** - Models are automatically saved to browser storage

---

## 🐛 Troubleshooting

### "Insufficient data for training"
- **Cause**: Less than 100 data points
- **Solution**: Load a different dataset or select a location with more data

### Charts not showing
- **Cause**: Dataset may not have loaded properly
- **Solution**: Refresh page and try loading dataset again

### Training takes too long
- **Cause**: Large dataset (214 MB station data)
- **Solution**: 
  1. Use city dataset instead
  2. Be patient - it's training a real neural network!
  3. Check browser console for progress

### Predictions seem inaccurate
- **Cause**: Insufficient training or noisy data
- **Solution**:
  1. Train for more epochs (modify code to increase from 50 to 100)
  2. Use a location with consistent data
  3. Check if training accuracy is >70%

---

## 🎓 How It Works (Simple Explanation)

Think of the AI like learning to predict weather:

1. **Learning Phase** (Training):
   - Shows the AI 7 days of pollution data
   - Asks: "What was day 8?"
   - AI makes a guess
   - We tell it the real answer
   - AI adjusts its "brain" to get better
   - Repeat 1000s of times!

2. **Prediction Phase**:
   - Give AI the last 7 days of data
   - AI uses patterns it learned
   - Makes educated guess about tomorrow
   - Shows confidence based on how well it learned

**Why LSTM?**
- Normal neural networks forget previous days
- LSTM has "memory" - remembers patterns over time
- Perfect for time series like pollution trends

---

## 📈 Future Improvements

Planned features:
- [ ] Multi-pollutant predictions (predict all pollutants at once)
- [ ] Weather integration (temperature, humidity affect pollution)
- [ ] Comparison with other models (Random Forest, ARIMA)
- [ ] Export predictions to CSV
- [ ] Real-time data updates
- [ ] Transfer learning from pre-trained models

---

## 🙏 Credits

- **TensorFlow.js**: Machine learning framework
- **Chart.js**: Data visualization
- **Dataset Sources**: 
  - City data: Air quality monitoring stations
  - Station data: Continuous air quality monitoring

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify dataset format matches expected schema
3. Try with a smaller dataset first
4. Clear browser cache and reload

**Browser Requirements:**
- Modern browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- Minimum 4 GB RAM for large datasets
- Stable internet connection (for loading libraries)

---

## 🎯 Quick Start Commands

```bash
# Navigate to project
cd C:\Users\Vinay\OneDrive\Desktop\Hacknova

# Start server
python -m http.server 8000

# Open browser
http://localhost:8000/ai-prediction.html
```

---

**Happy Predicting! 🌍🤖**
