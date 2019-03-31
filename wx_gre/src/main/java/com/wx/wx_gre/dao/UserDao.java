package com.wx.wx_gre.dao;

import com.wx.wx_gre.bean.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface UserDao {
    //根据openid查找user
    User findUserByOpenId(String openId);

    //插入user的openid
    int insertUser(User user);
}
