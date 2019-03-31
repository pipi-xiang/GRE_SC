package com.wx.wx_gre.dao;

import com.wx.wx_gre.bean.Message;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface MessageDao {
    //根据typeid查找全部便签
    List<Message> queryMessagesByTypeId(Integer typeid);
    //插入留言
    int addMessage(Message message);
}
