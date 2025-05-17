const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API URL constant
const API_URL = `${API_BASE_URL}/api`;

// Get user's orders
export const getMyOrders = async () => {
  try {
    console.log('Fetching orders with token:', localStorage.getItem('token'));
    const response = await fetch(`${API_URL}/orders/my-orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error response from server:', error);
      throw new Error(error.message || 'Failed to fetch orders');
    }

    const data = await response.json();
    console.log('Orders fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Payment gateway integration
export const initiatePayment = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/payment/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to initiate payment');
    }

    return data;
  } catch (error) {
    console.error('Payment initiation error:', error);
    return { 
      error: error.message,
      details: error.toString()
    };
  }
};

// Stripe payment integration
export const createStripeCheckoutSession = async (orderData) => {
  try {
    console.log('Creating Stripe checkout session with data:', orderData);
    
    const response = await fetch(`${API_URL}/payment/stripe/create-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData)
    });

    // Check if response is valid
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Server returned non-JSON response:', await response.text());
      return { 
        error: 'Server returned an invalid response format',
        details: 'Expected JSON response but received something else'
      };
    }

    const data = await response.json();
    console.log('Stripe checkout response:', data);
    
    if (!response.ok) {
      console.error('Stripe checkout failed with status:', response.status, data);
      throw new Error(data.message || data.error || 'Failed to create Stripe checkout session');
    }

    return data;
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return { 
      error: error.message || 'Stripe payment processing error',
      details: error.toString()
    };
  }
};

export const verifyStripePayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_URL}/payment/stripe/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(paymentData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify Stripe payment');
    }

    return data;
  } catch (error) {
    console.error('Stripe payment verification error:', error);
    return { 
      error: error.message,
      details: error.toString()
    };
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_URL}/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(paymentData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify payment');
    }

    return data;
  } catch (error) {
    console.error('Payment verification error:', error);
    return { 
      error: error.message,
      details: error.toString()
    };
  }
};

// Order API endpoints
export const createOrder = async (orderData) => {
  try {
    console.log('Sending order request with data:', JSON.stringify(orderData, null, 2));
    
    // Check authentication token
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return { 
        error: 'You must be logged in to place an order',
        details: 'Authentication token missing'
      };
    }
    
    console.log('API URL for order creation:', `${API_URL}/orders`);
    
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    // Check if the response is not JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Non-JSON response received:', await response.text());
      return { 
        error: 'Server returned an invalid response format',
        details: 'Expected JSON response but received something else'
      };
    }

    const data = await response.json();
    console.log('Server response:', data);
    
    if (!response.ok) {
      console.error('Order creation failed with status:', response.status, data);
      throw new Error(data.message || data.error || 'Failed to create order');
    }

    return data;
  } catch (error) {
    console.error('Order creation error in API:', error);
    return { 
      error: error.message,
      details: error.toString()
    };
  }
};

export const getOrderById = async (orderId) => {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ status })
  });
  return response.json();
};

export const updatePaymentStatus = async (orderId, paymentStatus) => {
  const response = await fetch(`${API_URL}/orders/${orderId}/payment`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ paymentStatus })
  });
  return response.json();
};

export const cancelOrder = async (orderId) => {
  const response = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const deleteOrder = async (orderId) => {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

// Admin only endpoints
export const getAllOrders = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const getOrderStats = async () => {
  const response = await fetch(`${API_URL}/orders/stats`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const getWeeklySales = async () => {
  const response = await fetch(`${API_URL}/orders/weekly-sales`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
}; 