// ============================================================
// userDB.ts — localStorage-based User Database
// Stores users array in browser's localStorage
// ============================================================

export interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

const DB_KEY = 'resume_builder_users';

// Simple hash function (for demo purposes — not for production secrets)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36) + str.length.toString(36);
}

// Get all users from localStorage
function getAllUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Save users array to localStorage
function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(DB_KEY, JSON.stringify(users));
}

// Generate a unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ─────────────────────────────────────────────
// SIGNUP: Register a new user
// Returns the new user or throws an error message
// ─────────────────────────────────────────────
export function signUpUser(
  username: string,
  email: string,
  password: string
): StoredUser {
  const users = getAllUsers();

  // Check if email already exists
  const existing = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    throw new Error('This email is already registered. Please login or use a different email.');
  }

  // Password length check
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const newUser: StoredUser = {
    id: generateId(),
    username: username.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: simpleHash(password),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
}

// ─────────────────────────────────────────────
// LOGIN: Verify credentials
// Returns the user or throws an error message
// ─────────────────────────────────────────────
export function loginUser(email: string, password: string): StoredUser {
  const users = getAllUsers();

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim()
  );

  if (!user) {
    throw new Error('This email is not registered. Please sign up first.');
  }

  if (user.passwordHash !== simpleHash(password)) {
    throw new Error('Incorrect password. Please try again.');
  }

  return user;
}

// ─────────────────────────────────────────────
// Get total registered users count (for debug)
// ─────────────────────────────────────────────
export function getUserCount(): number {
  return getAllUsers().length;
}
