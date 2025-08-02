import React, { useState } from 'react';

const ProductsScreen = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Lều Coleman Instant Cabin 8",
      category: "Lều",
      manufacturer: "Coleman",
      price: 4500000,
      stock: 15,
      description: "Lều gia đình 8 người, dựng trong 60 giây với công nghệ Pre-Attached Poles",
      specifications: {
        capacity: "8 người",
        dimensions: "4.3m x 2.4m x 1.8m",
        weight: "18.5kg",
        material: "Polyester 75D, chống thấm nước"
      },
      images: ["tent1.jpg", "tent1_2.jpg"],
      status: "active",
      createdDate: "2024-01-15",
      rating: 4.5,
      reviews: 32
    },
    {
      id: 2,
      name: "Túi ngủ Marmot Trestles Elite Eco 20",
      category: "Túi ngủ",
      manufacturer: "Marmot",
      price: 2800000,
      stock: 8,
      description: "Túi ngủ mùa đông với lớp lót SpiraFil Eco làm từ chai nhựa tái chế",
      specifications: {
        temperature: "-6°C đến 4°C",
        dimensions: "203cm x 81cm",
        weight: "1.36kg",
        material: "Nylon Pertex Quantum, SpiraFil Eco"
      },
      images: ["sleeping_bag1.jpg"],
      status: "active",
      createdDate: "2024-02-10",
      rating: 4.7,
      reviews: 18
    },
    {
      id: 3,
      name: "Bếp gas MSR PocketRocket 2",
      category: "Bếp dã ngoại",
      manufacturer: "MSR",
      price: 1200000,
      stock: 25,
      description: "Bếp gas siêu nhẹ, nhỏ gọn với khả năng đun sôi nước cực nhanh",
      specifications: {
        power: "8200 BTU/h",
        weight: "73g",
        dimensions: "10.4cm x 5.3cm x 8.5cm",
        fuel: "Gas canister tiêu chuẩn"
      },
      images: ["stove1.jpg", "stove1_2.jpg"],
      status: "active",
      createdDate: "2024-01-20",
      rating: 4.8,
      reviews: 45
    },
    {
      id: 4,
      name: "Ba lô Osprey Atmos AG 65",
      category: "Ba lô",
      manufacturer: "Osprey",
      price: 6500000,
      stock: 12,
      description: "Ba lô trekking cao cấp với hệ thống lưng thông khí Anti-Gravity",
      specifications: {
        capacity: "65 lít",
        weight: "2.1kg",
        dimensions: "81cm x 36cm x 33cm",
        material: "Nylon 210D, 420HD Nylon Packcloth"
      },
      images: ["backpack1.jpg"],
      status: "active",
      createdDate: "2024-01-05",
      rating: 4.9,
      reviews: 67
    },
    {
      id: 5,
      name: "Đèn pin Fenix PD36R",
      category: "Đèn pin",
      manufacturer: "Fenix",
      price: 2100000,
      stock: 30,
      description: "Đèn pin LED sạc USB-C với độ sáng lên đến 1600 lumens",
      specifications: {
        brightness: "1600 lumens",
        battery: "Li-ion 5000mAh",
        runtime: "200 giờ (chế độ tiết kiệm)",
        waterproof: "IP68"
      },
      images: ["flashlight1.jpg"],
      status: "active",
      createdDate: "2024-02-01",
      rating: 4.6,
      reviews: 28
    },
    {
      id: 6,
      name: "Bàn ghế dã ngoại ALPS Mountaineering",
      category: "Nội thất",
      manufacturer: "ALPS Mountaineering",
      price: 3200000,
      stock: 6,
      description: "Bộ bàn ghế gấp gọn cho 4 người, chất liệu nhôm siêu nhẹ",
      specifications: {
        capacity: "4 người",
        weight: "4.8kg",
        material: "Khung nhôm, mặt bàn melamine",
        dimensions: "120cm x 70cm x 70cm"
      },
      images: ["table_set1.jpg"],
      status: "active",
      createdDate: "2024-01-25",
      rating: 4.3,
      reviews: 15
    },
    {
      id: 7,
      name: "Giày trekking Salomon X Ultra 3 GTX",
      category: "Giày dép",
      manufacturer: "Salomon",
      price: 3800000,
      stock: 20,
      description: "Giày trekking với công nghệ Gore-Tex chống nước và đế Contagrip",
      specifications: {
        sizes: "39-46",
        weight: "375g (size 42)",
        material: "Synthetic, Gore-Tex",
        sole: "Contagrip MA"
      },
      images: ["shoes1.jpg"],
      status: "active",
      createdDate: "2024-02-05",
      rating: 4.7,
      reviews: 52
    },
    {
      id: 8,
      name: "Áo khoác Patagonia Houdini",
      category: "Quần áo",
      manufacturer: "Patagonia",
      price: 2500000,
      stock: 18,
      description: "Áo khoác siêu nhẹ chống gió và nước, có thể gấp gọn trong túi riêng",
      specifications: {
        weight: "102g",
        material: "15-denier Ripstop Nylon",
        sizes: "XS-XXL",
        packable: "Có thể gấp vào túi áo"
      },
      images: ["jacket1.jpg"],
      status: "active",
      createdDate: "2024-01-30",
      rating: 4.4,
      reviews: 38
    },
    {
      id: 9,
      name: "Máy lọc nước LifeStraw Personal",
      category: "Dụng cụ",
      manufacturer: "LifeStraw",
      price: 650000,
      stock: 40,
      description: "Ống hút lọc nước cá nhân, loại bỏ 99.9999% vi khuẩn và ký sinh trúng",
      specifications: {
        capacity: "4000 lít",
        weight: "57g",
        length: "22.5cm",
        filtration: "0.2 micron"
      },
      images: ["water_filter1.jpg"],
      status: "active",
      createdDate: "2024-02-12",
      rating: 4.5,
      reviews: 23
    },
    {
      id: 10,
      name: "Hammock ENO DoubleNest",
      category: "Võng",
      manufacturer: "ENO",
      price: 1800000,
      stock: 14,
      description: "Võng du lịch cho 2 người, chất liệu nylon parachute siêu bền",
      specifications: {
        capacity: "180kg",
        weight: "532g",
        dimensions: "2.9m x 1.9m",
        material: "70D High Tenacity Nylon Taffeta"
      },
      images: ["hammock1.jpg"],
      status: "active",
      createdDate: "2024-01-18",
      rating: 4.6,
      reviews: 31
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Lều', 'Túi ngủ', 'Bếp dã ngoại', 'Ba lô', 'Đèn pin', 'Nội thất', 'Giày dép', 'Quần áo', 'Dụng cụ', 'Võng'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState(product || {
      name: '',
      category: '',
      manufacturer: '',
      price: '',
      stock: '',
      description: '',
      specifications: {},
      status: 'active'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          width: '600px',
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <h3>{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label>Tên sản phẩm:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                required
              />
            </div>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <label>Danh mục:</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ flex: 1 }}>
                <label>Nhà sản xuất:</label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <label>Giá (VND):</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <label>Số lượng:</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Mô tả:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px', height: '80px' }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onCancel}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Hủy
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...productData, id: editingProduct.id, createdDate: editingProduct.createdDate }
          : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1,
        createdDate: new Date().toISOString().split('T')[0],
        rating: 0,
        reviews: 0,
        images: [],
        specifications: {}
      };
      setProducts([...products, newProduct]);
    }
    setShowAddForm(false);
    setEditingProduct(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Quản lý Sản phẩm</h2>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ➕ Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Tất cả danh mục' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#1976d2' }}>{filteredProducts.length}</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Sản phẩm hiển thị</p>
        </div>
        <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#4caf50' }}>{products.filter(p => p.stock > 0).length}</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Còn hàng</p>
        </div>
        <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#ff9800' }}>{products.filter(p => p.stock <= 5).length}</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Sắp hết hàng</p>
        </div>
        <div style={{ backgroundColor: '#ffebee', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#f44336' }}>{products.filter(p => p.stock === 0).length}</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Hết hàng</p>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '18px' }}>{product.name}</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {product.category}
                  </span>
                  <span style={{ fontSize: '14px', color: '#666' }}>{product.manufacturer}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  onClick={() => handleEditProduct(product)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>

            <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#333' }}>Thông số kỹ thuật:</h4>
              <div style={{ fontSize: '13px', color: '#666' }}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 'bold' }}>{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '15px',
              borderTop: '1px solid #eee'
            }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e91e63' }}>
                  {formatPrice(product.price)}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Kho: <span style={{ 
                    color: product.stock <= 5 ? '#f44336' : '#4caf50',
                    fontWeight: 'bold'
                  }}>
                    {product.stock}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', color: '#ff9800' }}>
                  ⭐ {product.rating} ({product.reviews} đánh giá)
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Tạo: {product.createdDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '50px',
          color: '#666',
          fontSize: '18px'
        }}>
          Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductsScreen;