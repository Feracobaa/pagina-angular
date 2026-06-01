import { Injectable, signal, computed } from '@angular/core';

export interface Course {
  id: string;
  title: string;
  category: string; // 'frontend' | 'backend' | 'devops' | 'cybersecurity' | 'datascience'
  categoryLabel: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  duration: string;
  lectures: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  description: string;
  skillsGained: string[];
  curriculum: string[];
  imageUrl: string;
}

export interface CartItem {
  course: Course;
  quantity: number;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // Courses Data Source
  private readonly coursesList = signal<Course[]>([
    {
      id: 'c1',
      title: 'Angular 21: Desarrollo Web y Componentes Standalone',
      category: 'frontend',
      categoryLabel: 'Front-End',
      level: 'Avanzado',
      rating: 4.9,
      reviewsCount: 1420,
      price: 89.99,
      originalPrice: 199.99,
      duration: '42 horas',
      lectures: 184,
      instructor: {
        name: 'Carlos Mendoza',
        role: 'Google Developer Expert - Angular',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      },
      description: 'Domina Angular 21 desde sus bases hasta patrones avanzados de renderizado, inyección de dependencias, Signals, SSR y optimización extrema de bundles.',
      skillsGained: [
        'Signals & Control Flow en Angular',
        'Componentes Independientes (Standalone)',
        'Server Side Rendering (SSR) y Prerendering',
        'Estrategias Avanzadas de Enrutamiento y Guards',
        'Gestión de Estado Reactivo con RxJS',
      ],
      curriculum: [
        'Introducción e Instalación de Angular CLI',
        'Estructura de Carpetas y Arquitectura de Componentes',
        'Sección Completa de Signals y Estado Reactivo',
        'Routing y Lazy Loading Avanzado',
        'Formularios Reactivos y Validaciones Personalizadas',
        'Consumo de APIs REST e Inyección de Dependencias',
        'Despliegue y Pruebas Unitarias con Vitest',
      ],
      imageUrl: 'images/frontend.png',
    },
    {
      id: 'c2',
      title: 'React & Next.js: De Cero a Producción (App Router)',
      category: 'frontend',
      categoryLabel: 'Front-End',
      level: 'Intermedio',
      rating: 4.8,
      reviewsCount: 3205,
      price: 79.99,
      originalPrice: 159.99,
      duration: '38 horas',
      lectures: 145,
      instructor: {
        name: 'Elena Rostova',
        role: 'Senior Frontend Architect',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
      },
      description: 'Crea aplicaciones listas para producción con Next.js y React. Domina el nuevo App Router, Server Actions, layouts anidados y optimización SEO.',
      skillsGained: [
        'React Server Components (RSC)',
        'Next.js App Router & Server Actions',
        'Optimización de Imágenes y Fuentes de Google',
        'Integración de Bases de Datos con Prisma',
        'Autenticación Avanzada con NextAuth',
      ],
      curriculum: [
        'Conceptos Fundamentales de React 19',
        'Fundamentos de Next.js y Renderizado Híbrido',
        'Enrutamiento Dinámico y Layouts',
        'Server Actions para el Manejo de Formularios y Mutaciones',
        'Estrategias de Caché y Revalidación de Datos',
        'Construcción de un E-commerce en Tiempo Real',
      ],
      imageUrl: 'images/frontend.png',
    },
    {
      id: 'c3',
      title: 'NestJS, Docker y Redis: Microservicios Altamente Escalables',
      category: 'backend',
      categoryLabel: 'Back-End',
      level: 'Avanzado',
      rating: 4.9,
      reviewsCount: 980,
      price: 119.99,
      originalPrice: 249.99,
      duration: '50 horas',
      lectures: 212,
      instructor: {
        name: 'David Silva',
        role: 'Principal Backend Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      },
      description: 'Aprende a estructurar backends empresariales. Crea microservicios modulares, implementa colas de mensajería con Redis y despliega tus aplicaciones con Docker.',
      skillsGained: [
        'Arquitectura NestJS e Inyección de Dependencias',
        'Dockerización de aplicaciones multi-contenedor',
        'Caché y Colas de Mensajería con Redis y BullMQ',
        'Diseño de Base de Datos relacional con PostgreSQL',
        'Comunicaciones gRPC y WebSockets',
      ],
      curriculum: [
        'Configuración de Entorno e Inicialización de NestJS',
        'Arquitectura de Módulos, Controladores y Servicios',
        'Manejo de Excepciones y Logging Centralizado',
        'Docker & Docker Compose para Entornos Locales',
        'Colas Asíncronas y Procesamiento en Segundo Plano',
        'Autenticación Segura con JWT y Roles',
      ],
      imageUrl: 'images/backend.png',
    },
    {
      id: 'c4',
      title: 'Ciencia de Datos y Machine Learning con Python',
      category: 'datascience',
      categoryLabel: 'Data Science',
      level: 'Principiante',
      rating: 4.7,
      reviewsCount: 1870,
      price: 69.99,
      originalPrice: 149.99,
      duration: '45 horas',
      lectures: 160,
      instructor: {
        name: 'Dr. Sofía Ortiz',
        role: 'Data Scientist & Investigadora de IA',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
      },
      description: 'El punto de partida perfecto para la IA. Domina Pandas, NumPy, Scikit-Learn y aprende a construir modelos de clasificación, regresión y clustering.',
      skillsGained: [
        'Manipulación de Datos con Pandas y NumPy',
        'Visualización Científica con Matplotlib y Seaborn',
        'Algoritmos Clásicos de Machine Learning',
        'Preprocesamiento e Ingeniería de Características',
        'Evaluación de Modelos e Hiperparámetros',
      ],
      curriculum: [
        'Sintaxis de Python Orientada a Datos',
        'Limpieza de Datos Sucios y Outliers',
        'Análisis Exploratorio de Datos (EDA)',
        'Modelos de Regresión Lineal y Logística',
        'Árboles de Decisión y Random Forests',
        'Introducción Práctica a Redes Neuronales con Keras',
      ],
      imageUrl: 'images/backend.png',
    },
    {
      id: 'c5',
      title: 'Hacker Ético y Seguridad Informática Ofensiva',
      category: 'cybersecurity',
      categoryLabel: 'Ciberseguridad',
      level: 'Intermedio',
      rating: 4.9,
      reviewsCount: 2430,
      price: 129.99,
      originalPrice: 279.99,
      duration: '48 horas',
      lectures: 195,
      instructor: {
        name: 'Marc Falcone',
        role: 'Certified Ethical Hacker (CEH) & Red Teamer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
      },
      description: 'Aprende las técnicas que usan los atacantes reales para descubrir vulnerabilidades, comprometer sistemas de forma ética y redactar informes de auditoría profesionales.',
      skillsGained: [
        'Escaneo de Redes y Enumeración con Nmap',
        'Identificación de Vulnerabilidades Web OWASP Top 10',
        'Explotación con Metasploit Framework',
        'Tácticas de Ingeniería Social y Phishing Controlado',
        'Seguridad en Redes Inalámbricas',
      ],
      curriculum: [
        'Fundamentos de Redes y Modelos de Seguridad',
        'Reconocimiento Activo y Pasivo',
        'Pentesting de Aplicaciones Web',
        'Ataques a Sistemas Operativos Linux y Windows',
        'Post-explotación e Incremento de Privilegios',
        'Redacción del Reporte Técnico de Auditoría',
      ],
      imageUrl: 'images/cybersecurity.png',
    },
    {
      id: 'c6',
      title: 'Arquitecto DevOps: Docker, Kubernetes & CI/CD Pipelines',
      category: 'devops',
      categoryLabel: 'DevOps',
      level: 'Avanzado',
      rating: 4.8,
      reviewsCount: 1540,
      price: 139.99,
      originalPrice: 299.99,
      duration: '52 horas',
      lectures: 230,
      instructor: {
        name: 'Roberto Gómez',
        role: 'Cloud Native & DevOps Architect',
        avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&h=150&q=80',
      },
      description: 'Automatiza el ciclo de vida del software. Diseña pipelines de CI/CD con GitHub Actions, gestiona microservicios con Kubernetes y monitoriza con Prometheus.',
      skillsGained: [
        'Creación y Optimización de Imágenes Docker',
        'Orquestación de Contenedores con Kubernetes (K8s)',
        'Automatización de Integración y Entrega Continua (CI/CD)',
        'Infraestructura como Código (IaC) con Terraform',
        'Monitoreo del Sistema con Prometheus y Grafana',
      ],
      curriculum: [
        'Cultura DevOps y Metodologías Ágiles',
        'Fundamentos y Comandos Avanzados de Docker',
        'Arquitectura de Kubernetes: Pods, Services, Ingress',
        'GitHub Actions, GitLab CI y Jenkins Pipelines',
        'Despliegues en la Nube con AWS y GCP',
        'Monitoreo Avanzado de Infraestructura',
      ],
      imageUrl: 'images/cybersecurity.png',
    },
  ]);

  // Active Search and Filters
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('all');
  
  // UI & Modals State
  readonly cart = signal<CartItem[]>([]);
  readonly selectedCourse = signal<Course | null>(null);
  readonly isCartOpen = signal<boolean>(false);
  readonly isCheckoutOpen = signal<boolean>(false);
  readonly checkoutSuccess = signal<boolean>(false);
  
  // Notification Toast State
  readonly toasts = signal<Toast[]>([]);
  private toastIdCounter = 0;

  // Computed Filtered Courses List
  readonly filteredCourses = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();
    
    return this.coursesList().filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.name.toLowerCase().includes(query);
        
      const matchesCategory = category === 'all' || course.category === category;
      
      return matchesSearch && matchesCategory;
    });
  });

  // Computed Cart Stats
  readonly cartCount = computed(() => {
    return this.cart().reduce((total, item) => total + item.quantity, 0);
  });

  readonly cartTotal = computed(() => {
    return this.cart().reduce((total, item) => total + item.course.price * item.quantity, 0);
  });

  // Actions
  addToCart(course: Course): void {
    const currentCart = this.cart();
    const existingItem = currentCart.find((item) => item.course.id === course.id);

    if (existingItem) {
      this.showToast(`Se incrementó la cantidad de "${course.title}" en el carrito.`, 'info');
      this.cart.set(
        currentCart.map((item) =>
          item.course.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this.showToast(`"${course.title}" fue agregado al carrito.`, 'success');
      this.cart.set([...currentCart, { course, quantity: 1 }]);
    }
  }

  removeFromCart(courseId: string): void {
    const currentCart = this.cart();
    const itemToRemove = currentCart.find((item) => item.course.id === courseId);
    if (itemToRemove) {
      this.showToast(`"${itemToRemove.course.title}" eliminado del carrito.`, 'info');
    }
    this.cart.set(currentCart.filter((item) => item.course.id !== courseId));
  }

  updateCartQuantity(courseId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(courseId);
      return;
    }
    this.cart.set(
      this.cart().map((item) =>
        item.course.id === courseId ? { ...item, quantity } : item
      )
    );
  }

  clearCart(): void {
    this.cart.set([]);
  }

  showToast(message: string, type: 'success' | 'info' = 'success'): void {
    const id = this.toastIdCounter++;
    this.toasts.set([...this.toasts(), { id, message, type }]);
    
    // Automatically remove toast after 3 seconds
    setTimeout(() => {
      this.toasts.set(this.toasts().filter((t) => t.id !== id));
    }, 3500);
  }

  // Modals Actions
  openDetails(course: Course): void {
    this.selectedCourse.set(course);
  }

  closeDetails(): void {
    this.selectedCourse.set(null);
  }

  openCart(): void {
    this.isCartOpen.set(true);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  openCheckout(): void {
    if (this.cart().length === 0) {
      this.showToast('El carrito está vacío.', 'info');
      return;
    }
    this.isCartOpen.set(false);
    this.isCheckoutOpen.set(true);
  }

  closeCheckout(): void {
    this.isCheckoutOpen.set(false);
    this.checkoutSuccess.set(false);
  }

  completeCheckout(): void {
    this.checkoutSuccess.set(true);
    this.clearCart();
    this.showToast('¡Pago procesado con éxito! Bienvenido a tus cursos.', 'success');
  }
}
