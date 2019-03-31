package com.wx.wx_gre.controller;

import com.alibaba.fastjson.JSONObject;
import com.wx.wx_gre.bean.User;
import com.wx.wx_gre.service.UserService;
import com.wx.wx_gre.utils.GetOpenIdUtil;
import org.apache.ibatis.annotations.Param;
import org.hibernate.validator.constraints.Range;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.util.ObjectUtils;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    private String openid;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    @ResponseBody
    public Integer decodeUserInfo(String code) {
        PreparedStatement preparedStatement = null;
        String appid = "wxc290b498b5ac8977";
        String appsecret = "bfe4f649f430d41dcab1105188ba8edc";
        GetOpenIdUtil getOpenId = new GetOpenIdUtil();
        //调用访问微信服务器工具方法，传入三个参数获取带有openid、session_key的json字符串
        String jsonId = getOpenId.getOpenId(appid, code, appsecret);
        JSONObject jsonObject = JSONObject.parseObject(jsonId);
        //从json字符串获取openid和session_key
        openid = jsonObject.getString("openid");
        String session_key = jsonObject.getString("session_key");
        User user = userService.findUserByOpenId(openid);
        int userid = 0;
        userid = user.getUserid();
        if (user == null) {
            User user1 = new User();
            user1.setOpenid(openid);
            userService.insertUser(user1);
            userid = user1.getUserid();
        }
        else{
            userid = user.getUserid();
        }
        return userid;
    }

    @RequestMapping(value = "/getUserId", method = RequestMethod.GET)
    public User findUserByOpenId(String openId) {
        System.out.println(openId);
        User user = userService.findUserByOpenId(openid);
        return user;
    }
}
