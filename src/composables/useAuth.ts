import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// Define user interface
export interface User {
  id: number;
  username: string;
  name: string;
  department: string;
  role: string;
}

// Create a simple authentication composable
export function useAuth() {
  const router = useRouter();
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value);

  // For demo purposes, we're using localStorage for persistence
  const initAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  const login = async (username: string, password: string) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // For demo, we'll accept any credentials
      if (username && password) {
        // Mock successful login
        const loggedInUser: User = {
          id: 1,
          username: username,
          name: 'System Administrator',
          department: 'IT Department',
          role: 'Administrator'
        };
        
        user.value = loggedInUser;
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        return true;
      } else {
        throw new Error('Username and password are required');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during login';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
    router.replace('/login');
  };

  // Initialize authentication state
  initAuth();

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout
  };
}

// 創建一個沒有依賴 Vue Router 的實現
export const createAuth = () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value);

  // 從 localStorage 初始化
  const initAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  const login = async (username: string, password: string) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // 任何憑證都可以登入的模擬實現
      if (username && password) {
        // 模擬登入成功
        const loggedInUser: User = {
          id: 1,
          username: username,
          name: 'System Administrator',
          department: 'IT Department',
          role: 'Administrator'
        };
        
        user.value = loggedInUser;
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        return true;
      } else {
        throw new Error('Username and password are required');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during login';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // 先初始化身份驗證狀態
  initAuth();

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    // logout 在使用時會添加
  };
};

// 創建一個全局共享實例但不調用 useRouter
const authState = createAuth();
export default authState;
