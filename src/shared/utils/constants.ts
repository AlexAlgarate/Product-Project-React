export const constants = {
  header: { 'Content-Type': 'application/json' },
  tokenKey: 'products-token',
  storage: 'storage',
  storageChange: 'storage-change',
  imagePlaceholder: 'https://demofree.sirv.com/nope-not-here.jpg',
};

export const Routes = {
  products: '/products',
  login: '/login',
  register: '/register',
  home: '/',
  productDetail: '/products/:id',
  newProduct: 'products/new-product',
};

export const labelNavbarOptions = {
  login: 'Iniciar sesión',
  home: 'Inicio',
  products: 'Productos',
};

export const redirectTimeout = 3000;
