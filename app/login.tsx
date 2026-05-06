import { useState, useRef, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { authStorage } from '@/services/auth.storage';
import * as LocalAuthentication from 'expo-local-authentication';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import { router } from 'expo-router';

const COLORS = {
  azul: '#454546',
  verde: '#ff9800',
  fondo: '#8c8c8c',
  blanco: '#FFFFFF',
  texto: '#454546',
  placeholder: '#666666',
  shadow: 'rgba(0,0,0,0.15)',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 992;

  const passwordInputRef = useRef<TextInput>(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [error]);

  // Verificar biometría al montar
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const available = compatible && enrolled;
      setBiometricAvailable(available);

      if (available) {
        const enabled = await authStorage.isBiometricEnabled();
        setBiometricEnabled(enabled);
        if (enabled) {
          const token = await authStorage.getToken();
          if (token) {
            await attemptBiometricLogin();
          }
        }
      }
    })();
  }, []);

  const attemptBiometricLogin = async () => {
    setLoading(true);
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticarse con huella o Face ID',
        fallbackLabel: 'Usar contraseña',
      });
      if (result.success) {
        router.replace('/(tabs)');
      } else {
        setError('Autenticación biométrica cancelada');
      }
    } catch {
      setError('Error en autenticación biométrica');
    } finally {
      setLoading(false);
    }
  };

  const promptEnableBiometric = async (token: string) => {
    Alert.alert(
      'Inicio rápido',
      '¿Quieres iniciar sesión con huella o Face ID la próxima vez?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí',
          onPress: async () => {
            const result = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Verifica tu huella o Face ID para activar',
              fallbackLabel: 'Cancelar',
            });
            if (result.success) {
              await authStorage.saveToken(token);
              await authStorage.setBiometricEnabled(true);
              setBiometricEnabled(true);
            }
          },
        },
      ]
    );
  };

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      if (!data.token) {
        throw new Error('El servidor no retornó token de sesión');
      }
      // Guardar token y nombre de usuario
      await authStorage.saveToken(data.token);
      if (data.user?.nombre) {
        await authStorage.saveUserName(data.user.nombre);
      }

      // Si biometría disponible y aún no habilitada, preguntar
      if (biometricAvailable && !(await authStorage.isBiometricEnabled())) {
        promptEnableBiometric(data.token);
      } else {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const layoutDirection = isDesktop ? 'row' : 'column';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.mainContainer, { flexDirection: layoutDirection }]}>
          {/* Top Section - Logo */}
          <View style={[styles.topSection, isDesktop && styles.topSectionDesktop]}>
            <View style={styles.logoTitleWrapper}>
              <View style={styles.logoBg}>
                <Text style={styles.logoText}>LOGO</Text>
              </View>
              <View style={styles.companyTitle}>
                <Text style={styles.companyTitleH1}>TruckInfo</Text>
                <Text style={styles.companyTitleP}>Status</Text>
              </View>
            </View>
          </View>

          {/* Bottom Section - Form */}
          <View style={[styles.bottomSection, isDesktop && styles.bottomSectionDesktop]}>
            <View style={styles.formWrapper}>
              <Text style={styles.formTitle}>Iniciar Sesión</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.inputField}
                  value={email ?? ''}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError(null);
                  }}
                  placeholder="correo@empresa.com"
                  placeholderTextColor={COLORS.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={false}
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    ref={passwordInputRef}
                    style={[styles.inputField, styles.passwordInput]}
                    value={password ?? ''}
                    onChangeText={(text) => {
                      setPassword(text);
                      setError(null);
                    }}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.placeholder}
                    secureTextEntry={!showPassword}
                    returnKeyType="go"
                    onSubmitEditing={handleLogin}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

            
              {error && (
                <Animated.View style={[styles.errorBox, { transform: [{ translateX: shakeAnim }] }]}>
                  <Text style={styles.errorText}>{error}</Text>
                </Animated.View>
              )}

              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.blanco} size="small" />
                  ) : (
                    <Text style={styles.submitButtonText}>Ingresar</Text>
                  )}
                </TouchableOpacity>

                {biometricAvailable && (
                  <TouchableOpacity
                    style={styles.biometricButton}
                    onPress={attemptBiometricLogin}
                    activeOpacity={0.8}
                    disabled={loading}
                  >
                    <Text style={styles.biometricButtonText}>🔓 Usar huella / Face ID</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.azul,
  },
  // Top Section
  topSection: {
    backgroundColor: COLORS.azul,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  topSectionDesktop: {
    flex: 1,
    minHeight: 0,
  },
  logoTitleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBg: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.verde,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  logoText: {
    color: COLORS.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyTitle: {
    alignItems: 'center',
  },
  companyTitleH1: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.blanco,
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
  },
  companyTitleP: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffc340',
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
  },
  // Bottom Section
  bottomSection: {
    backgroundColor: COLORS.fondo,
    borderTopLeftRadius: 90,
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 10,
    minHeight: 400,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomSectionDesktop: {
    flex: 1,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 0,
    minHeight: 0,
    justifyContent: 'center',
  },
  formWrapper: {
    width: '100%',
    maxWidth: 384,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.texto,
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.placeholder,
    marginBottom: 4,
  },
  inputField: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#666666',
    color: COLORS.texto,
    paddingVertical: 8,
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    marginRight: 8,
  },
  eyeButton: {
    padding: 4,
    marginBottom: 4,
  },
  eyeText: {
    fontSize: 18,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.azul,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: COLORS.verde,
  },
  checkmark: {
    color: COLORS.blanco,
    fontSize: 12,
    fontWeight: 'bold',
  },
  rememberText: {
    fontSize: 14,
    color: COLORS.placeholder,
  },
  buttonWrapper: {
    marginTop: 32,
  },
  submitButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.verde,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    textAlign: 'center',
  },
  biometricButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.azul,
    alignItems: 'center',
    marginTop: 12,
  },
  biometricButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.blanco,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.blanco,
  },
});