/**
 * Generic API Response wrapper (matches BE ResponseBase)
 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/**
 * API Error Response (matches BE AppException)
 */
export interface ApiErrorResponse {
  code: string
  message: string
  status_code: number
  details?: unknown
}

/**
 * Paginated API Response
 */
export interface PaginatedResponse<T> {
  code: number
  message: string
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

/**
 * API List Response (without pagination)
 */
export interface ListResponse<T> {
  code: number
  message: string
  data: T[]
  total: number
}

/**
 * Empty success response
 */
export interface SuccessResponse {
  code: number
  message: string
}

// ==================== Auth Types ====================

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * Register request payload (matches BE UserCreate)
 */
export interface RegisterRequest {
  email: string
  password: string
}

/**
 * User data from BE (matches BE UserOut)
 */
export interface UserOut {
  id: number
  email: string
  is_active: boolean
  role_id: number
}

/**
 * Token response (matches BE Token)
 */
export interface TokenResponse {
  access_token: string
  token_type: string
}

/**
 * Login response data
 */
export interface LoginResponseData {
  access_token: string
  token_type: string
  user: UserOut
}

/**
 * Register response (just user, no token yet since BE doesn't return token on register)
 */
export interface RegisterResponseData {
  user: UserOut
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refresh_token: string
}

/**
 * Refresh token response
 */
export interface RefreshTokenResponseData {
  access_token: string
}

/**
 * User profile data
 */
export interface UserProfileData {
  id: number
  email: string
  name?: string
  is_active: boolean
  role_id: number
}
