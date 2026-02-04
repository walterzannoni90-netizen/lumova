import { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Globe,
  Shield,
  Eye,
  EyeOff,
  Save,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export function SettingsPage() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing'>('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    website: '',
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    projectCompleted: true,
    marketingEmails: false,
    securityAlerts: true,
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - replace with actual API call
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${activeTab === tab.id
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                  : 'text-slate-400 hover:bg-dark-700 hover:text-white'}
              `}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {saved && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400" />
              <p className="text-green-400">Settings saved successfully</p>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-white mb-6">Profile Information</h2>
              <form onSubmit={handleProfileSave} className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <button type="button" className="btn-secondary text-sm">
                      Change Avatar
                    </button>
                    <p className="text-sm text-slate-500 mt-2">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="form-input pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="form-input pl-12"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="form-label">Bio</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="form-input min-h-[100px] resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="form-label">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      className="form-input pl-12"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn-primary flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-lg font-semibold text-white mb-6">Change Password</h2>
                <form onSubmit={handlePasswordSave} className="space-y-6">
                  <div>
                    <label className="form-label">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="form-input pl-12 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="form-input pl-12 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="form-input pl-12"
                      />
                    </div>
                    {passwordForm.newPassword && passwordForm.confirmPassword &&
                      passwordForm.newPassword !== passwordForm.confirmPassword && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          Passwords do not match
                        </p>
                      )}
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="btn-primary flex items-center gap-2">
                      <Save className="w-5 h-5" />
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h2>
                <p className="text-slate-400 mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <button className="btn-secondary">Enable 2FA</button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: 'emailUpdates', label: 'Product Updates', description: 'Receive updates about new features and improvements' },
                  { key: 'projectCompleted', label: 'Project Completion', description: 'Get notified when your projects finish generating' },
                  { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional content and special offers' },
                  { key: 'securityAlerts', label: 'Security Alerts', description: 'Get notified about important security updates' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) =>
                          setNotifications({ ...notifications, [item.key]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-lg font-semibold text-white mb-4">Current Plan</h2>
                <div className="flex items-center justify-between p-4 bg-primary-600/10 border border-primary-500/30 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Free Plan</p>
                    <p className="text-sm text-slate-400">3 projects per month</p>
                  </div>
                  <button className="btn-primary">Upgrade to Pro</button>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold text-white mb-4">Payment Methods</h2>
                <p className="text-slate-400 mb-4">No payment methods added yet.</p>
                <button className="btn-secondary flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Add Payment Method
                </button>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold text-white mb-4">Billing History</h2>
                <p className="text-slate-400">No billing history available.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
