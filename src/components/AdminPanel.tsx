import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Users, Award, MessageCircle, Flame, RefreshCw, CheckCircle, Trash2 } from 'lucide-react';
import { AdminStats, User } from '../types';

interface AdminPanelProps {
  user: any;
}

export default function AdminPanel({ user }: AdminPanelProps) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${user.id}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to access administrative tables');
      setStats(data.stats);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, [user.id]);

  const handleClearDatabase = async () => {
    if (!confirm('Are you sure you want to clear all telemetry and reset the mock database?')) return;
    try {
      const res = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.id}` }
      });
      if (res.ok) {
        setSuccess('Database successfully reset to initial seed values!');
        fetchAdminStats();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center min-h-[80vh]">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm font-medium font-mono">Accessing security credentials...</p>
        </div>
      </div>
    );
  }

  const s = stats || {
    totalUsers: 2,
    premiumUsers: 1,
    totalSessions: 14,
    totalKcalBurned: 12500,
    users: []
  };

  return (
    <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto text-left overflow-y-auto h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-900 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center space-x-2.5">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            <span>SaaS Admin Console</span>
          </h1>
          <p className="text-xs text-gray-400">Review system health metrics, customer accounts, and databases</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchAdminStats}
            className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-gray-400 hover:text-white rounded-xl transition"
            title="Refresh tables"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleClearDatabase}
            className="bg-red-950/40 hover:bg-red-900 text-red-200 border border-red-500/20 py-2 px-4 rounded-xl text-xs font-semibold flex items-center space-x-2 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Database</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{success}</span>
        </div>
      )}

      {/* Aggregate metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-900 space-y-3">
          <div className="flex justify-between items-center text-gray-500 uppercase text-[10px] font-bold">
            <span>Total Accounts</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{s.totalUsers}</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-900 space-y-3">
          <div className="flex justify-between items-center text-gray-500 uppercase text-[10px] font-bold">
            <span>Pro Subscriptions</span>
            <Award className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{s.premiumUsers}</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-900 space-y-3">
          <div className="flex justify-between items-center text-gray-500 uppercase text-[10px] font-bold">
            <span>AI Coach Queries</span>
            <MessageCircle className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{s.totalSessions}</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-900 space-y-3">
          <div className="flex justify-between items-center text-gray-500 uppercase text-[10px] font-bold">
            <span>Aggregate Kcal Burn</span>
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{s.totalKcalBurned} kcal</div>
        </div>

      </div>

      {/* Users table list */}
      <div className="p-6 rounded-3xl bg-slate-950/60 border border-slate-900 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">System Customer Accounts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-900 text-gray-500 uppercase text-[9px] font-bold">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Goal</th>
                <th className="py-3 px-4">Stats</th>
                <th className="py-3 px-4">Allergies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 text-gray-300">
              {s.users && s.users.map((u: User) => (
                <tr key={u.id} className="hover:bg-slate-900/10">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div>{u.name}</div>
                    <div className="text-[10px] text-gray-500 font-normal">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`py-0.5 px-1.5 text-[9px] font-bold uppercase rounded ${
                      u.isPremium
                        ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        : 'bg-slate-900 text-gray-500'
                    }`}>
                      {u.isPremium ? 'Premium Pro' : 'Free'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-purple-300">
                    {u.profile?.goal || 'Not Onboarded'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-400">
                    {u.profile ? `${u.profile.weight}kg • ${u.profile.height}cm` : 'N/A'}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 truncate max-w-[150px]">
                    {u.profile?.allergies || 'None'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
