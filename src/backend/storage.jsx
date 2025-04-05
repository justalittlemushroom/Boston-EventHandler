import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export async function addEvent(name, description, pictureURL, address, timeframe, cost, tags) {
    try {
        const { data, error } = await supabase
            .from("Events") 
            .insert([{ name, description, pictureURL, address, timeframe, cost, tags }]);
        
        if (error) throw error; 
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}

export async function deleteEvent(name) {
    try {
        const { data, error } = await supabase
        .from("Events") 
        .delete()
        .match({ name }); 
        if (error) throw error; 
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}

export async function getEventByName(name) {
    try {
        const { data, error } = await supabase 
        .from("Events")
        .select("*")
        .eq("name", name);
        if (error) throw error;
        if (data) { setEvents(data); }
    } catch (error) {
        alert(error);
    }
}

export async function getEventByTag(tag) {
    try {
        const { data, error } = await supabase 
        .from("Events")
        .select("*")
        .contains("tags", [tag]);
        if (error) throw error;
        if (data) { setEvents(data); }
    } catch (error) {
        alert(error);
    }
}

export async function getEvents() {
    try {
        const { data, error } = await supabase 
        .from("Events")
        .select("*"); 
        if (error) throw error;
        if (data) { setEvents(data); }
    } catch (error) {
        alert(error);
    }
}