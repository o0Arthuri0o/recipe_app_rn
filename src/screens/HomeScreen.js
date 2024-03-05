import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TextInput} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';


const HomeScreen = () => {

  const [activeCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])

  useEffect(() => {
    getCategories()
    getMeal()
  }, [])

  useEffect(() => {
    setMeals([])
    getMeal(activeCategory)
    
  }, [activeCategory])

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      
      if(response && response.data){
        setCategories(response.data.categories)
      }

    } catch (error) {
      console.log("error", error.message)
    }
  }

  const getMeal = async (category='Beef') => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      
      if(response && response.data){
        setMeals(response.data.meals)
      }

    } catch (error) {
      console.log("error", error.message)
    }
  }

  return (
    <View  className = 'flex-1 bg-white' >
      <StatusBar style='dark' />
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{paddingBottom: 50}}
          className='space-y-6 pt-14'
        >

          <View className='mx-4 flex-row justify-between items-center mb-2 ' >
            <Image source={require('../../assets/avatar.png')} style={{height: hp(5), width: hp(5.5)}} />
            <BellIcon size={hp(4)} color='gray' />
          </View>

            <View className='mx-4 space-y-2 mb-2' >
              <Text style={{fontSize:hp(1.7)}} className='text-neutral-600' >Hellow, Victor!</Text>
              <View>
                <Text style={{fontSize:hp(3.8)}} className='font-semibold text-neutral-600' >Find your favorite recipe</Text>
              </View>

              <Text  style={{fontSize:hp(3.8)}} className='font-semibold text-neutral-600' >and cook at <Text className='text-amber-400' >home</Text>
              </Text>

            </View>

            <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]' >
              <TextInput
                placeholder='Search any recipe'
                placeholderTextColor={'gray'}
                style={{fontSize: hp(1.7)}}
                className='flex-1 text-base mb-1 pl-3 tracking-wider'
              />

              <View className='bg-white rounded-full p-3' >
                <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'} />
              </View>
            </View>

            <View>
            { categories.length > 0 &&
              <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            }
            </View>


            {/*recipes*/}
            <View>
              <Recipes meals={meals} categories={categories} />
            </View>

        </ScrollView>
    </View>
  )
}

export default HomeScreen