package com.wx.wx_gre.dao;

import com.wx.wx_gre.bean.Note;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
@Mapper
@Component
public interface NoteDao {
    //根据noteid查找便签
    Note findNotesByNoteId(Integer noteid);
    //根据userid查找全部便签
    List<Note> queryNotesByUserId(@Param("userid") Integer userid);
    //添加便签
    int addNotes(Note note);
    //修改便签
    int editNotes(Note note);
    //删除便签
    int deleteNotes(Integer noteid);
}
