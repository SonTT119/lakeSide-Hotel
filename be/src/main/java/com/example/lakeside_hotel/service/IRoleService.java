package com.example.lakeside_hotel.service;

import java.util.List;

import com.example.lakeside_hotel.model.Role;
import com.example.lakeside_hotel.model.User;

public interface IRoleService {
    List<Role> getRoles();

    Role createRole(Role theRole);

    void deleteRole(Long roleId);

    Role findRoleByName(String name);

    User removeUserFromRole(Long userId, Long roleId);

    User assignRoleToUser(Long userId, Long roleId);

    Role removeAllUserFromRole(Long roleId);

}
