import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { categoryData } from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeOut } from 'react-native-reanimated';


export default function Categories({categories ,activeCategory, setActiveCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} >
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='space-x-4'
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    categories.map((cat, index) => {
                        let isActive = cat.strCategory === activeCategory
                        let activeButtomClass = isActive ? 'bg-amber-400' : 'bg-black/10'
                        return(
                            <TouchableOpacity
                                onPress={() => setActiveCategory(cat.strCategory)}
                                key={index}
                                className='flex items-center space-y-1'
                            >
                                <View className={'rounded-full p-[6px] ' + activeButtomClass} >
                                    <Image
                                        source={{uri: cat.strCategoryThumb}}
                                        style={{width: hp(6), height: hp(6)}}
                                        className='rounded-full'
                                    />
                                </View>
                                <Text className='text-neutral-600' style={{fontSize:hp(1.6)}} >{cat.strCategory}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    </Animated.View>
  )
}