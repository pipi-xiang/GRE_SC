package com.wx.wx_gre.service;

import com.wx.wx_gre.bean.Note;

import java.util.List;

public interface NoteService {
    //根据noteid查找便签
    Note findNotesByNoteId(Integer noteid);
    //根据userid查找全部便签
    List<Note> queryNotesByUserId(Integer userid);
    //添加便签
    int addNotes(Note note);
    //修改便签
    int editNotes(Note note);
    //删除便签
    int deleteNotes(Integer noteid);
}
