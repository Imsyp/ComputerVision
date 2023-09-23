import matplotlib.pyplot as plt
import numpy as np

def ReLU(x):
    return np.maximum(0, x)

x = np.arange(-5.0, 5.0, 0.1)
y = ReLU(x)

fig = plt.figure(figsize=(8,6))
fig.set_facecolor('white')

plt.title("ReLU", fontsize=30)
plt.xlabel('x', fontsize=15)
plt.ylabel('y', fontsize=15, rotation=0)
plt.axvline(0.0, color='gray', linestyle='--', alpha=0.8)
plt.axhline(0.0, color='gray', linestyle='--', alpha=0.8)
plt.plot(x,y)
plt.show()