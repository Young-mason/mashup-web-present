export interface RewardModel {
  uid: number;
  campaign_id: number;
  user_id: number;
  user_name: string;
  product_id: number;
  reward_reason: string;
  created_at: string;
  delivered_at: string;
  updated_at: string;
  reward_expired_at: string;
}

export interface RewardResponse {
  status: "success" | "fail";
  data: {
    items: RewardModel[];
    total: number;
  };
}
