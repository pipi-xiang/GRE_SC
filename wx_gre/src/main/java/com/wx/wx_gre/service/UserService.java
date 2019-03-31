package com.wx.wx_gre.service;

import com.wx.wx_gre.bean.User;

public interface UserService {
    //根据openid查找user
    public User findUserByOpenId(String openId);

    //插入user的openid
    public int insertUser(User user);
}
