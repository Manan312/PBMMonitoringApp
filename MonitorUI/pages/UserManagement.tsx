import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { UserPlus, Search, X } from "lucide-react-native";

import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";

import { UserAddUpdateRequest, UserDetailsResponse } from "../models/User";

import { globalStyles } from "../styles/globalStyle";
import { userManagementStyles as styles } from "../styles/userManagementStyle";

import { GetAllUsers, UpdateUserDetails } from "../services/utilityServices";
import { showError } from "../services/toastService";

const MENUS = ["Master", "PBM", "Services", "Users"];

export const UserManagement = () => {
  const [users, setUsers] = useState<UserDetailsResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserDetailsResponse | null>(
    null,
  );

  const [addUser, setAddUser] = useState<UserAddUpdateRequest>({
    UserId: 0,
    Name: "",
    Password: "",
    UserName: "",
    Role: "2",
    UserMenus: [],
  });

  const [editUser, setEditUser] = useState<UserDetailsResponse>({
    UserId: 0,
    Name: "",
    UserName: "",
    Role: "2",
    UserMenus: [],
  });

  const fetchUsers = async () => {
    const data = await GetAllUsers();
    if (data) setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.Name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [users, searchQuery]);

  const toggleMenu = (menu: string) => {
    if (editingUser) {
      const selected = editUser.UserMenus.includes(menu);

      setEditUser({
        ...editUser,
        UserMenus: selected
          ? editUser.UserMenus.filter((m) => m !== menu)
          : [...editUser.UserMenus, menu],
      });
    } else {
      const selected = addUser.UserMenus.includes(menu);

      setAddUser({
        ...addUser,
        UserMenus: selected
          ? addUser.UserMenus.filter((m) => m !== menu)
          : [...addUser.UserMenus, menu],
      });
    }
  };

  const saveUser = async () => {
    try {
      if (editingUser) {
        await UpdateUserDetails({
          ...editUser,
          Password: "",
        });
      } else {
        await UpdateUserDetails(addUser);
      }

      await fetchUsers();
      setShowForm(false);
      setEditingUser(null);
    } catch {
      showError("Something went wrong");
    }
  };

  const handleRoleChange = (role: "1" | "2") => {
    if (editingUser) {
      let updatedMenus = editUser.UserMenus;

      if (role === "2") {
        updatedMenus = updatedMenus.filter((m) => m !== "Users");
      }

      setEditUser({
        ...editUser,
        Role: role,
        UserMenus: updatedMenus,
      });
    } else {
      let updatedMenus = addUser.UserMenus;

      if (role === "2") {
        updatedMenus = updatedMenus.filter((m) => m !== "Users");
      }

      setAddUser({
        ...addUser,
        Role: role,
        UserMenus: updatedMenus,
      });
    }
  };

  const getAvailableMenus = () => {
    const role = editingUser ? editUser.Role : addUser.Role;

    if (role === "2") {
      return MENUS.filter((menu) => menu !== "Users");
    }

    return MENUS;
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={globalStyles.title}>User Management</Text>
          <Text style={globalStyles.subtitle}>
            Manage user roles and menu access
          </Text>
        </View>

        <View style={styles.actions}>
          <View style={styles.searchWrapper}>
            <Search size={18} color="#94a3b8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search users..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <Button
            variant="primary"
            icon={UserPlus}
            style={styles.addButton}
            onPress={() => {
              setEditingUser(null);

              setAddUser({
                UserId: 0,
                Name: "",
                Password: "",
                UserName: "",
                Role: "2",
                UserMenus: [],
              });

              setShowForm(true);
            }}
          >
            Add User
          </Button>
        </View>
      </View>

      {/* MODAL FORM */}

      <Modal visible={showForm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* HEADER */}

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingUser ? "Edit User" : "Add User"}
              </Text>

              <TouchableOpacity onPress={() => setShowForm(false)}>
                <X size={18} color="#475569" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {/* NAME */}

              <TextInput
                placeholder="Name"
                value={editingUser ? editUser.Name : addUser.Name}
                style={styles.input}
                onChangeText={(t) =>
                  editingUser
                    ? setEditUser({ ...editUser, Name: t })
                    : setAddUser({ ...addUser, Name: t })
                }
              />

              {/* USERNAME */}

              <TextInput
                placeholder="Username"
                value={editingUser ? editUser.UserName : addUser.UserName}
                style={styles.input}
                onChangeText={(t) =>
                  editingUser
                    ? setEditUser({ ...editUser, UserName: t })
                    : setAddUser({ ...addUser, UserName: t })
                }
              />

              {/* PASSWORD (ONLY ADD USER) */}

              {!editingUser && (
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  value={addUser.Password}
                  style={styles.input}
                  onChangeText={(t) => setAddUser({ ...addUser, Password: t })}
                />
              )}

              {/* ROLE */}

              <Text style={styles.label}>Role</Text>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                {["1", "2"].map((role) => {
                  const selected = editingUser
                    ? editUser.Role === role
                    : addUser.Role === role;

                  return (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.roleButton,
                        selected && styles.roleButtonActive,
                      ]}
                      onPress={() => handleRoleChange(role as "1" | "2")}
                    >
                      <Text
                        style={[
                          styles.roleText,
                          selected && styles.roleTextActive,
                        ]}
                      >
                        {role === "1" ? "ADMIN" : "USER"}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* MENU ACCESS */}

              <Text style={styles.label}>Menu Access</Text>

              <View style={styles.accessGrid}>
                {getAvailableMenus().map((menu) => {
                  const selected = editingUser
                    ? editUser.UserMenus.includes(menu)
                    : addUser.UserMenus.includes(menu);

                  return (
                    <TouchableOpacity
                      key={menu}
                      onPress={() => toggleMenu(menu)}
                      style={[
                        styles.accessButton,
                        selected
                          ? styles.accessButtonActive
                          : styles.accessButtonInactive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.accessButtonText,
                          selected
                            ? styles.accessButtonTextActive
                            : styles.accessButtonTextInactive,
                        ]}
                      >
                        {menu.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* SAVE BUTTON */}

              <Button
                variant="primary"
                style={{ marginTop: 24 }}
                onPress={saveUser}
              >
                Save User
              </Button>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* TABLE */}

      <Card style={styles.card}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 2 }]}>User</Text>
            <Text style={[styles.th, { flex: 1 }]}>Role</Text>
            <Text style={[styles.th, { flex: 3 }]}>Menus</Text>
            <Text style={[styles.th, { flex: 1 }]}>Actions</Text>
          </View>

          <ScrollView style={{ maxHeight: 400 }}>
            {filteredUsers.map((user) => (
              <View key={user.UserId} style={styles.tableRow}>
                <View style={[styles.userCell, { flex: 2 }]}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {user.Name?.[0]?.toUpperCase() ?? "U"}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.userEmail}>{user.Name}</Text>
                    <Text style={styles.userId}>ID: #{user.UserId}</Text>
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleBadgeText}>
                      {user.Role === "1" ? "ADMIN" : "USER"}
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 3 }}>
                  <View style={styles.menuContainer}>
                    {user.UserMenus.map((menu) => (
                      <View key={menu} style={styles.menuChip}>
                        <Text style={styles.menuText}>
                          {menu.toUpperCase()}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <Button
                    variant="secondary"
                    onPress={() => {
                      setEditingUser(user);
                      setEditUser(user);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </Card>
    </View>
  );
};
