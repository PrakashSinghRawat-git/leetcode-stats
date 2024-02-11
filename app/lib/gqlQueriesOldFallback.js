const endpoint = process.env.NEXT_PUBLIC_LEETCODE_GRAPHQL_API;

export const completeUserInfoQuery = (username, year) => {
    const newQuery = `query {
        matchedUser(username: "${username}") {
            contestBadge {
                name
                expired
                hoverText
                icon
            }
           
            username
            githubUrl
            twitterUrl
            linkedinUrl
            profile {
                ranking
                userAvatar
                realName
                aboutMe
                school
                websites
                countryName
                company
                jobTitle
                skillTags
                postViewCountDiff
                postViewCount
                solutionCount
                reputation
                categoryDiscussCount
                reputationDiff
                solutionCountDiff
                categoryDiscussCountDiff
            }
            problemsSolvedBeatsStats {
                difficulty
                percentage
            }
            languageProblemCount {
      languageName
      problemsSolved
    }
            submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
            userCalendar(year: ${year}) {
                activeYears
                streak
                totalActiveDays
                dccBadges {
                    timestamp
                    badge {
                        name
                        icon
                    }
                }
                submissionCalendar
            }
            badges {
                id
                name
                shortName
                displayName
                icon
                hoverText
                medal {
                    slug
                    config {
                        iconGif
                        iconGifBackground
                    }
                }
                creationDate
                category
            }
            upcomingBadges {
                name
                icon
                progress
            }
        }
        allQuestionsCount {
            difficulty
            count
        }
        userContestRanking(username: "${username}") {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
            badge {
                name
            }
        }
  
    }`;

    const combinedQuery = `${endpoint}?query=${newQuery}`;
    return combinedQuery;
};

export const UserInfoForComparisonQuery = (username) => {
    const newQuery = `query {
        matchedUser(username: "${username}") {
           
            username
             
             submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
           
            badges {
                id
              
                 
            }
             
        }
         
        
        userContestRanking(username: "${username}") {
            attendedContestsCount
            
             
        }
   
    }`;

    const combinedQuery = `${endpoint}?query=${newQuery}`;
    return combinedQuery;
};

export const userCheckQuery = (username) => {
    const newQuery = `query {
        matchedUser(username: "${username}") {
           
            username
           
        }
    }`;

    const combinedQuery = `${endpoint}?query=${encodeURIComponent(newQuery)}`;
    return combinedQuery;
};
export const userContestHistoryForComparisonQuery = (username) => {
    const newQuery = `query {
        matchedUser(username: "${username}") {
            
            username
             
        }userContestRankingHistory(username: "${username}") {
                attended
                rating
                ranking
                contest {
                    startTime
                }
            }
    }`;

    const combinedQuery = `${endpoint}?query=${newQuery}`;
    return combinedQuery;
};
export const usersSubmissionForComparisonQuery = (username, limit) => {
    const newQuery = `query {
         matchedUser(username: "${username}") {
            
            username
             
        }
       recentAcSubmissionList(username: "${username}", limit: ${limit}) {
            title
            timestamp
  }
    }`;

    const combinedQuery = `${endpoint}?query=${newQuery}`;
    return combinedQuery;
};
