import { useState, useEffect } from "react";
import { supabase } from "./supabase";

async function addEvent(name, description, pictureURL, address, time, tags) {
    try {
        const { data, error } = await supabase
        .from("Events") 
        .insert({ event_name: name, description: description, pictureURL: pictureURL, event_address: address, event_time: time, tags: tags})
        .single();
        if (error) throw error; 
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}

async function deleteEvent(name) {
    try {
        const { data, error } = await supabase
        .from("Events") 
        .delete()
        .match({event_name: name});
        if (error) throw error; 
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}

async function getEvents() {
    try {
        const { data, error } = await supabase 
        .from("Events")
        .select("*"); 
        if (error) throw error;
        if (data != null) {  setGroceries(data); }
    } catch (error) {
        alert(error);
    }
}

useEffect(() => {
    getEvents();
}, []);
