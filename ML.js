class SimpleML {
  constructor(epochs,lr) {
    this.weights = null;
    this.learningRate = lr || 0.01;
    this.epochs = epochs || 5000;
  }

  train(X, y) {
    const m = X.length;
    const n = X[0].length;
    this.weights = new Array(n).fill(0);

    for (let epoch = 0; epoch < this.epochs; epoch++) {
      let predictions = X.map(row => this.predict(row));
      let errors = predictions.map((pred, i) => pred - y[i]);
      for (let j = 0; j < n; j++) {
        let gradient = (1 / m) * errors.reduce((sum, err, i) => sum + err * X[i][j], 0);
        this.weights[j] -= this.learningRate * gradient;
      }
    }
  }

  predict(input) {
    return input.reduce((sum, val, i) => sum + this.weights[i] * val, 0);
  }
}

function normalizeFeatures(X) {
  const n = X[0].length;
  const means = new Array(n).fill(0);
  const stds = new Array(n).fill(0);

  for (let j = 1; j < n; j++) { // skip bias at 0th index
    let col = X.map(row => row[j]);
    let mean = col.reduce((a, b) => a + b, 0) / col.length;
    let std = Math.sqrt(col.reduce((sum, val) => sum + (val - mean) ** 2, 0) / col.length);
    means[j] = mean;
    stds[j] = std || 1; // avoid division by zero
  }

  const X_norm = X.map(row =>
    row.map((val, j) => (j === 0 ? val : (val - means[j]) / stds[j]))
  );

  return { X_norm, means, stds };
}

function normalizeInput(input, means, stds) {
  return input.map((val, i) => (i === 0 ? val : (val - means[i]) / stds[i]));
}

