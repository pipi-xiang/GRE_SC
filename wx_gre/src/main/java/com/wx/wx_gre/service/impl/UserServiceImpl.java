package com.wx.wx_gre.service.impl;

import com.wx.wx_gre.bean.User;
import com.wx.wx_gre.dao.UserDao;
import com.wx.wx_gre.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service(value = "userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User findUserByOpenId(String openId) {
        return userDao.findUserByOpenId(openId);
    }

    @Override
    public int insertUser(User user) {
        if (user.getOpenid() != null) {
            userDao.insertUser(user);
          }
        return 1;
    }
}
