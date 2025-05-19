import { ref, computed } from 'vue';
import { useRouter } from '@ionic/vue-router';

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

// Create a global singleton instance
const authInstance = useAuth();
export default authInstance;
